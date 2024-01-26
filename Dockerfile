FROM docker.io/node:17-alpine3.14

COPY juice-ws*.tgz /data/

RUN npm install -g /data/juice-ws*.tgz

ENTRYPOINT juice-ws server
