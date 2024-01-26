# Juice basic web-service

Expose juice (CSS inliner) as a web service.


## Curl usage

```
curl --location --request GET 'http://localhost:8000/juice' \
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

### v0.1.0 - 2024-01-26

Initial release.
