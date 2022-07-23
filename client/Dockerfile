FROM node:18-alpine as builder

WORKDIR /client

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

FROM nginx

EXPOSE 80

COPY --from=builder /client/build /var/www/html