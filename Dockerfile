FROM docker.io/node:17-alpine3.14

RUN npm pack /data/ && npm install -g juice-ws*.tgz

CMD juice-ws
