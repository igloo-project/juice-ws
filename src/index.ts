import * as fs from "fs";
import express from "express";
import { Strategy as AnonymousStrategy } from "passport-anonymous";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import juice from "juice";
import { JuiceBody } from "./juicews";
import { parse } from "yaml";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

// command line parsing
yargs.scriptName("juice-ws")
  .usage("$0 <cmd> [args]")
  .command("server", "Launch juice server", (yargsOptions) => {
    yargsOptions
      .number("port").alias("p", "port")
      .string("config").alias("c", "config")
      .default("config", "config.yaml")
  }, argv => {
    runServer(argv)
  })
  .demandCommand()
  .help()
  .parse(hideBin(process.argv))

interface BearerAuth {
  username: string
  token: string
}

interface Server {
  port: number
}

interface Authentication {
  anonymous: boolean
  bearer: BearerConfig
}

interface BearerConfig {
  users: BearerAuth[]
}

interface Config {
  server: Server
  authentication: Authentication
}

function initializeApp(config: Config) {
  // express app
  const app = express();
  app.use(express.json())

  const auths: Record<string, BearerAuth> = {}
  for (const auth of config.authentication.bearer.users) {
    auths[auth.token] = auth
  }

  // authentication
  const passport = require("passport")
  passport.use("bearer", new BearerStrategy((token, done) => {
    if (auths[token] !== undefined) {
      const user = { username: auths[token], token }
      console.debug("Authentication: user=%s", auths[token].username)
      return done(null, user)
    } else {
      return done(null, false)
    }
  }))
  passport.use("anonymous", new AnonymousStrategy())

  // auth pipelines
  const optionalAuthentication = passport.authenticate(["bearer", "anonymous"], { session: false })
  const mandatoryAuthentication = passport.authenticate(["bearer"], { session: false })

  const serviceAuthentication = config.authentication.anonymous ?
    optionalAuthentication : mandatoryAuthentication

  app.get('/api/v1/ping', optionalAuthentication, (req, res) => {
    console.log(req.user)
    const response = {
      "message": "pong",
      "authenticated": req.user !== undefined
    }
    res.send(response)
  })

  app.get('/api/v1/inline', serviceAuthentication, (req,res) => {
    const juiceBody = req.body as JuiceBody;
    res.send(juice(juiceBody.content, juiceBody.options))
  })

  return app
}

function runServer(argv: any) {
  const config = parseConfig(argv)
  const app = initializeApp(config)
  const server = app.listen(config.server.port, () => {
    console.log('Listening...')
  })

  process.on('SIGINT', () => {
    console.debug('SIGINT signal received: closing HTTP server')
    server.close(() => {
      console.debug('HTTP server closed')
    })
  })
}

function parseConfig(argv: any) {
  const file = fs.readFileSync(argv.config, 'utf8')
  const config: Config = parse(file)
  // setup defaults
  if (config.server === undefined) {
    config.server = {} as Server
  }
  if (config.server.port === undefined) {
    config.server.port = 8000
  }
  if (config.authentication === undefined) {
    config.authentication = { anonymous: true, bearer: { users: [] } } as Authentication
  }
  if (config.authentication.anonymous === undefined) {
    config.authentication.anonymous = false
  }
  if (config.authentication.bearer === undefined) {
    config.authentication.bearer = {} as BearerConfig
  }
  if (config.authentication.bearer.users === undefined) {
    config.authentication.bearer.users = [] as BearerAuth[]
  }
  // override from command-line
  if (argv.port) {
    config.server.port = argv.port
  }
  return config
}