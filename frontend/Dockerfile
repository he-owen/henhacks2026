ARG VITE_API_URL=https://henhacks2026.onrender.com

ENV VITE_API_URL=$VITE_API_URL

FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL=https://henhacks2026.onrender.com

ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
RUN echo 'server { root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
