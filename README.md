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
