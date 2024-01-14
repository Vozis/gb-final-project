################################
# Develop stage
################################
#FROM my-base-image:nx-base as develop
FROM node:18.19.0-alpine as develop
MAINTAINER ilya <sizov.ilya1996@gmail.com>
RUN apk update
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV development

#RUN npm install @nx/nx-linux-x64-musl\
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --fetch-timeout=600000

COPY . .
RUN npm run prisma-generate
RUN npm run build:server
################################
# Prod stage
################################
FROM node:18-alpine as prod
RUN apk add --no-cache dumb-init
WORKDIR /usr/src/app

COPY --from=develop /usr/src/app/dist/apps/server ./
COPY --from=develop /usr/src/app/apps/server/prisma /usr/src/app/prisma
COPY --from=develop /usr/src/app/apps/server/src/constants /usr/src/app/constants
COPY --from=develop /usr/src/app/node_modules ./node_modules

ENV PORT 4300
EXPOSE ${PORT}
#ENV HOSTNAME "127.0.0.1"
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV production

#RUN npm install --only=production && npm cache clean --force
#RUN chown -R node:node .
#USER node
CMD ["dumb-init", "node", "main"]
