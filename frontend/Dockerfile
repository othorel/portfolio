FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

# Commande pour démarrer le serveur Next.js
CMD ["npm", "run", "start"]
