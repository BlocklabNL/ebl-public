FROM node:12-slim as base

ENV NODE_ENV=production
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app

USER node

COPY --chown=node:node package.json package-lock*.json ./
RUN yarn install --production && yarn cache clean --force


FROM base as dev

ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH

RUN yarn install --only=development

CMD ["ts-node-dev", "src/index.ts"]


FROM dev as build

COPY --chown=node:node . .
RUN yarn build


FROM base as source

COPY --chown=node:node . .


FROM source as prod

COPY --chown=node:node --from=build /app/lib /app/lib

CMD ["node", "lib/src/index.js"]
