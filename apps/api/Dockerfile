FROM node:18.14.2 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:18.14.2 AS final

WORKDIR /app

COPY --from=builder ./app/dist ./dist

COPY package.json .

RUN npm install --production

RUN npm install pm2 -g

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]