FROM node:22

WORKDIR /app/backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN chown -R node:node /app

# USER node

CMD ["npm", "run", "dev"]
