FROM node:alpine

WORKDIR '/blockchain'

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]