FROM node:8-alpine as builder

RUN echo "http://mirrors.aliyun.com/alpine/v3.6/main" > /etc/apk/repositories
RUN echo "http://mirrors.aliyun.com/alpine/v3.6/community" >> /etc/apk/repositories

# Add core packages to allow building native extensions
RUN apk add --no-cache make gcc g++ python

RUN npm config set registry 'https://registry.npm.taobao.org'
RUN yarn config set registry 'https://registry.npm.taobao.org'

RUN npm install -g yarn

WORKDIR /src

COPY package.json yarn.lock /src/
RUN yarn install

COPY . /src



FROM node:8-alpine

RUN npm config set registry 'https://registry.npm.taobao.org'
RUN npm install -g pm2

WORKDIR /app

COPY --from=builder /src/ /app/
USER node

EXPOSE 3000

CMD [ "pm2-docker", "--json", "--instances", "0", "dist/main.js" ]
#CMD ["npm", "run", "start"]
