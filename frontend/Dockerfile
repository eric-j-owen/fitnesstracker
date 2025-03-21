FROM node:22-alpine

WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]