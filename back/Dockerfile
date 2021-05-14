FROM node:lts-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

COPY / /app

CMD ["node", "app.js"]