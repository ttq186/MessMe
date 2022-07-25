# Stage 0: build and compile the frontend into static files
FROM node:18-alpine as build-stage

WORKDIR /client

COPY ./package.json ./
RUN yarn install

COPY ./ ./
RUN yarn build

# Stage 1: have only the compiled app, ready for production with nginx
FROM nginx:1.23

EXPOSE 80

COPY --from=build-stage /client/build/ /usr/share/nginx/html