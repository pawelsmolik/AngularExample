### STAGE 1: Build ###
FROM node:21-bookworm-slim AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build_prod

### STAGE 2: Run ###
FROM nginx:latest
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/angular-example /usr/share/nginx/html