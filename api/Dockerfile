FROM node:18.12-alpine3.17

RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app

COPY package*.json .
RUN npm ci
COPY . .

EXPOSE 3000
CMD ["node", "index"]