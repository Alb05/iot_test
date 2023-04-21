FROM node:alpine as builder
WORKDIR '/app'
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --prod BreweryFE

FROM nginx:alpine-slim
COPY --from=builder /app/dist/BreweryFE /usr/share/nginx/html
EXPOSE 80
