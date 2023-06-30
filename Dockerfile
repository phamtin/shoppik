FROM node:18.15.0-alpine

RUN npm --global install pnpm --force

WORKDIR /apps

# Copy root package.json and lockfile
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy the api package.json
COPY apps/api/package.json ./apps/api/package.json
 
# Copy app source
COPY . .

RUN pnpm install 

RUN pnpm run build   

EXPOSE 9000

CMD ["node", "apps/api/dist/index.js"]