################################
# Develop stage
################################

FROM node:18-alpine as dev

MAINTAINER ilya <sizov.ilya1996@gmail.com>

#RUN apt-get update && apt-get install -y openssl nodejs
#RUN apk update && apk add openssl nodejs --no-cache libc6-compat

WORKDIR /usr/src/app/builder

COPY package*.json ./

RUN npm ci

COPY  . .
