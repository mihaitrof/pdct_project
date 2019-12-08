FROM node:8.16.2-alpine

WORKDIR /usr/app

COPY ./ .
RUN npm install --quiet

COPY . .


