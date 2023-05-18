# FROM node:18-alpine3.16 AS builder

# WORKDIR /app

# # RUN npm install yarn --global --force
# RUN npm --global install pnpm

# COPY package.json .

# RUN npm install

# # RUN mkdir /app/dist


# # FROM node:18-alpine3.16 AS final

# # WORKDIR /app


# # COPY package.json .

# # RUN yarn install --omit=dev -W
# # RUN npm ci --omit=dev

# # RUN yarn install -W
# # RUN yarn build
# # COPY ./dist /app/dist

# # RUN yarn global add pm2
# # RUN npm run build

# COPY . .

# EXPOSE 8080

FROM node:18.15.0-alpine

ENV NODE_ENV production

RUN npm --global install pnpm
RUN npm --global install yarn --force

WORKDIR /apps

COPY package*.json ./

RUN yarn install 

COPY . .

RUN yarn build   

EXPOSE 8080

CMD ["node", "./dist/index.js"]