FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --include=dev

COPY . .

RUN npm run build

# RUN chown -R node:node /app

# USER node

CMD ["npm", "run", "dev"]
