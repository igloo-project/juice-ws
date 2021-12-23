# Juice basic web-service

Expose juice (CSS inliner) as a web service.


## Curl usage

```
curl --location --request GET 'http://localhost:8080/juice' \
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
