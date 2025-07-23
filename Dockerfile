# Use Node LTS as base image
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --from=build /app/app ./app
COPY --from=build /app/dist ./dist
COPY --from=build /app/index.html ./index.html
COPY --from=build /app/public ./public
COPY --from=build /app/src ./src
COPY --from=build /app/tailwind.config.js ./tailwind.config.js
COPY --from=build /app/postcss.config.js ./postcss.config.js
COPY --from=build /app/vite.config.js ./vite.config.js

EXPOSE 3000
CMD ["node", "app/server.js"]