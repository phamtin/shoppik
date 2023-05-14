FROM node:18-alpine3.16 AS builder

WORKDIR /app

RUN npm install yarn --global --force
RUN npm --global install pnpm

COPY . .

RUN yarn install -W

RUN mkdir /app/dist

RUN yarn build

FROM node:18-alpine3.16 AS final

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package.json .

RUN yarn install --omit=dev -W

RUN yarn global add pm2

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]