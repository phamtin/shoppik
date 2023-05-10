FROM node:18.15.0 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:18.15.0 AS final

WORKDIR /app

COPY --from=builder ./app/dist ./dist

COPY package.json .

RUN npm install --omit=dev

RUN npm install pm2 -g

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]