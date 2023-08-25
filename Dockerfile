# Build stage
FROM node:16.14.2-buster as builder

WORKDIR /app
ARG VERSION
ARG APP_ENV

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install 

COPY . .

RUN yarn build 


# Run stage
FROM node:16.14.2-buster-slim

ENV NODE_ENV production

WORKDIR /app

RUN adduser --system --uid 1001 nonroot; \
    addgroup --system --gid 1001 nonroot;

COPY --from=builder --chown=nonroot ["/app/package.json", "/app/next.config.js", "./"]
COPY --from=builder --chown=nonroot  /app/.next ./.next
COPY --from=builder --chown=nonroot  /app/node_modules ./node_modules

COPY --chown=nonroot public  ./public

USER nonroot

EXPOSE 3000

CMD [ "yarn", "start" ]