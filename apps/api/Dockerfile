FROM node:18.15.0-alpine

ENV NODE_ENV production

RUN npm --global install pnpm --force

WORKDIR /apps

COPY package*.json ./

COPY . .

RUN pnpm install 

RUN pnpm run build   

EXPOSE 8000

CMD ["node", "apps/api/dist/index.js"]