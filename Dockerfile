FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

ENV PORT 3000

EXPOSE 3000

CMD ["yarn", "start"]
