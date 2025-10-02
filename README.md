# Juice basic web-service

Expose juice (CSS inliner) as a web service.


## Curl usage

```
curl --location --request GET 'http://localhost:8000/api/v1/inline' \
--header 'Content-Type: application/json' \
--data-raw '{"content": "<style>div{color:red;}</style><div/>", "options": {"extraCss": "div {background-color: black;}"}}'
```


## Build container

```
dnf install -y buildah
npm run buildah
```


## Run container

```
dnf install -y podman
npm run podman
```

## Release

```
npm version NEW_VERSION --no-git-tag-version
git add -A
git commit
git tag vNEW_VERSION
git push origin main vNEW_VERSION
```

## Changelog

### v0.8.0 - 2025-10-03

* juice version update (11.0.1 -> 11.0.3)
* pino version update (9.7.0 -> 9.13.0)
* pino-pretty version update (13.0.0 -> 13.1.1)
* yaml version update (2.8.0 -> 2.8.1)
* typescript version update (5.8.3 -> 5.9.3)
* @types/passport-http-bearer version update (1.0.41 -> 1.0.42)
* @types/node version update (24.0.10 -> 24.6.2)

### v0.7.0 - 2025-07-04

* express version update (4.19.2 -> 5.1.0)
* juice version update (11.0.0 -> 11.0.1)
* yaml version update (2.5.0 -> 2.8.0)
* yargs version update (17.7.2 -> 18.0.0)
* typescript version update (5.5.4 -> 5.8.3)
* update and clean logging

### v0.6.0 - 2024-08-23

* pin all dependencies version
* add package-lock.json
* juice 11.0.0 (fix https://github.com/cheeriojs/cheerio/issues/4034)

### v0.5.0 - 2024-08-20

* juice 10.0.1
* workaround cheerio bug https://github.com/cheeriojs/cheerio/issues/4034

### v0.4.0 - 2024-08-14

* fix container: node version update needed
* container: node 17 -> 20

### v0.3.0 - 2024-08-14

* express version update
* typescript version update

### v0.2.0 - 2024-01-26

* YAML configuration
* authentication and anonymous support
* ping API

### v0.1.0 - 2024-01-26

Initial release.
