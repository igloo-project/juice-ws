FROM docker.io/node:20-alpine3.20

COPY juice-ws*.tgz /data/

RUN npm install -g /data/juice-ws*.tgz

ENTRYPOINT juice-ws server
