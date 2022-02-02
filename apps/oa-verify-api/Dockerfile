FROM node:alpine
WORKDIR /usr/oa-verify-api
COPY package.json .
COPY . .
RUN yarn install
RUN yarn run build
CMD [ "node", "dist/server.js" ]
EXPOSE 3000