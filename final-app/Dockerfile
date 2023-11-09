################################
# Develop stage
################################

FROM node:18-alpine as dev

MAINTAINER ilya <sizov.ilya1996@gmail.com>

#RUN apt-get update && apt-get install -y openssl nodejs
RUN apk update && apk add openssl nodejs --no-cache libc6-compat

#ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
#RUN npm install

COPY  . .

RUN npm uninstall argon2
RUN npm install argon2

#RUN npx prisma generate

#EXPOSE 4200

#ENV PORT 4200
#ENV HOST 0.0.0.0
