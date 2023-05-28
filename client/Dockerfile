FROM node:18.12-alpine3.17 AS build-stage
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:mainline-alpine3.17-slim 
# RUN addgroup app && adduser -S -G app app
# USER app
COPY --from=build-stage /app/dist/client /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80