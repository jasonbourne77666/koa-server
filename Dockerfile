
FROM node:14

WORKDIR /server

COPY . /server

RUN npm set registry https://registry.npm.taobao.org

RUN npm install

# RUN npm i -g pm2

CMD npm run build && npm run serve

