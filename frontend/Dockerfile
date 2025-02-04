FROM node:23-alpine AS build

RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN [ -f .env.production ] || cp .env.example .env.production
RUN pnpm build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
