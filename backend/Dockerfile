FROM node:20-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3001

CMD npx prisma migrate deploy && npm run start
