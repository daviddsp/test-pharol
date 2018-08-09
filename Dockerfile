FROM node:7.8

ADD . /app
WORKDIR /app

RUN npm install

ARG APP_NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}


RUN NODE_ENV=build npm install
EXPOSE 8080 80

CMD ["node", "run", "start"]
