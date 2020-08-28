FROM node:12.0.0 as builder

RUN npm install npm@6.9.0
RUN npm install -g @angular/cli@9.1.3

COPY . ./app
WORKDIR /app

RUN npm install
RUN npm update

RUN npm run build-prod

FROM nginx:1-alpine
COPY ./compose/prod/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
