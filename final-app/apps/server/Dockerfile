################################
# Develop stage
################################
FROM node:18-alpine as develop

MAINTAINER ilya <sizov.ilya1996@gmail.com>

RUN apk update && apk add openssl

ENV NODE_ENV development

WORKDIR /usr/src/app

#COPY dist/apps/server/package*.json ./
COPY package*.json ./

RUN npm install
#--only=production

COPY . .

RUN npm run prisma-generate

RUN npm run build:server

################################
# Prod stage
################################

FROM node:18-alpine as prod

RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV PORT 4202
EXPOSE ${PORT}

WORKDIR /usr/src/app

#COPY --from=develop /usr/src/app/node_modules ./node_modules
#COPY --from=develop /usr/src/app/package.json ./package.json
COPY --from=develop usr/src/app/dist/apps/server ./

RUN npm install --only=production
#RUN chown -R node:node .
#USER node

CMD ["dumb-init", "node", "main.js"]
