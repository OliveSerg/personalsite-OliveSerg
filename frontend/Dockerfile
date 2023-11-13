# syntax=docker/dockerfile:1.4
FROM node:lts
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "dev"]