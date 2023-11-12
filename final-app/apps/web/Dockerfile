#FROM docker.io/nginx:stable-alpine
#COPY  dist/apps/web/* /usr/share/nginx/html/
##EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

################################
# Develop stage
################################

FROM node:18-alpine as develop

MAINTAINER ilya <sizov.ilya1996@gmail.com>

RUN apk update && apk add openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:web


################################
# Prod stage
################################

FROM node:18-alpine as prod

ENV NODE_ENV production
ENV PORT 4300
EXPOSE ${PORT}

WORKDIR /usr/src/app

RUN npm install -g serve

COPY --from=develop usr/src/app/dist/apps/web ./

#RUN npm install --only=production

ENV PORT 4202
ENV HOSTNAME "0.0.0.0"

CMD ["serve", "build" ]
