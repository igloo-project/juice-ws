import express from "express";
import juice from "juice";
import { JuiceBody } from "./juicews";
const app = express();

app.use(express.json())

app.get('/juice', (req,res) => {
  const juiceBody = req.body as JuiceBody;
  res.send(juice(juiceBody.content, juiceBody.options))
})

const server = app.listen(8080, () => {
  console.log('Listening...')
})

process.on('SIGINT', () => {
  console.debug('SIGINT signal received: closing HTTP server')
  server.close(() => {
    console.debug('HTTP server closed')
  })
})


