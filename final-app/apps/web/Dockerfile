################################
# Develop stage
################################
FROM node:18.19.0-alpine as develop
MAINTAINER ilya <sizov.ilya1996@gmail.com>
RUN apk update
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install @nx/nx-linux-x64-musl
RUN npm install
COPY . .
RUN npm run build:web

ENV PORT 4200
ENV HOSTNAME "0.0.0.0"
EXPOSE ${PORT}
#CMD ["npm", "run", "front:production"]

################################
# Prod stage
################################
FROM nginx:1.21.0-alpine as prod
WORKDIR /usr/src/app
#WORKDIR /usr/share/nginx/html
COPY --from=develop usr/src/app/dist/apps/web ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENV PORT 4200
ENV HOSTNAME "0.0.0.0"
#ENV HOSTNAME "127.0.0.1"
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]

#################################
## Prod stage
#################################
#
#FROM node:18-alpine as prod
#
#ENV NODE_ENV production
#ENV PORT 4200
#ENV HOSTNAME "0.0.0.0"
#EXPOSE ${PORT}
#
#WORKDIR /usr/src/app
#
#RUN npm install -g serve
#
#COPY --from=develop usr/src/app/dist/apps/web ./
#
##CMD ["serve", "build" ]


#FROM docker.io/nginx:stable-alpine
#COPY  dist/apps/web/* /usr/share/nginx/html/
##EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
