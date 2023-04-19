FROM nodered/node-red:latest-minimal AS base
WORKDIR /usr/src/node-red
EXPOSE 1880

FROM nodered/node-red AS build
WORKDIR /usr/src/node-red
COPY --chown=node-red:root --chmod=644 nodered/package.json /usr/src/node-red/
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

FROM base AS final
WORKDIR /usr/src/node-red
COPY --from=build /usr/src/node-red/ .
COPY --chmod=644 nodered/flows.json /data
COPY --chown=node-red:node-red --chmod=644 nodered/temp.csv /data
COPY --chown=node-red:node-red --chmod=644 nodered/hum.csv /data
