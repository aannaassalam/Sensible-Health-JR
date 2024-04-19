FROM node:20.12.2

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build

CMD ["npm","start"]

