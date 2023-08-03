FROM node:18-alpine
ENV NODE_ENV=production

ARG token
ARG host
ARG port

ENV CONSUL_TOKEN=$token
ENV CONSUL_HOST=$host
ENV CONSUL_PORT=$port

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "consul.js"]
