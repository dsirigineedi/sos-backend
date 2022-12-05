FROM node:alpine as development-base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install


FROM keymetrics/pm2:12-alpine as development
WORKDIR /usr/src/app/
COPY --from=development-base /usr/src/app/ .
COPY . .
EXPOSE 3000/tcp
ENV NPM_CONFIG_LOGLEVEL=info NODE_ENV=development
CMD [ "pm2-runtime", "start", "/usr/src/app/server.js" ]