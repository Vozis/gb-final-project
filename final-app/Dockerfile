################################
# Develop stage
################################

FROM node:18-alpine3.18 as dev

MAINTAINER ilya <sizov.ilya1996@gmail.com>

#RUN apt-get update && apt-get install -y openssl nodejs
RUN apk update && apk add openssl nodejs --no-cache libc6-compat

#ENV NODE_ENV development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci
#RUN npm install

COPY --chown=node:node . .

#RUN npm uninstall argon2
#RUN npm install argon2

#RUN npx prisma generate

USER node


#################################
## Build stage
#################################

#FROM node:18-alpine as build
#
#WORKDIR /usr/src/app
#
#COPY --from=dev /usr/src/app/node_modules ./node_modules
#
#COPY . .
#
#ENV NEXT_TELEMETRY_DISABLED 1
#
#ENV NODE_ENV production
#
#RUN npm run build
#
##RUN npm ci --only=production && npm cache clean --force
##RUN npm ci --omit=dev && npm cache clean --force
#
#################################
## Production stage
#################################
#
#FROM node:18-alpine as prod
#
#ENV NEXT_TELEMETRY_DISABLED 1
#
#ENV NODE_ENV production
#
##RUN addgroup -g 1001 -S nodejs
##RUN adduser -S nextjs -u 1001
#
#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs
#
#COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next/standalone ./standalone
#COPY --from=build --chown=nextjs:nodejs /usr/src/app/public /usr/src/app/standalone/public
#COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next/static /usr/src/app/standalone/.next/static
#
#USER nextjs
#
#EXPOSE 3000
#
##CMD ["npm", "start"]
#CMD ["node", "./standalone/server.js"]
