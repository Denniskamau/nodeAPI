FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json  /usr/src/app
RUN npm install

COPY . /usr/src/app
#ADD ./.sequelizerc /usr/src/app/.sequelizerc

ENV NODE_ENV development

EXPOSE 3000

CMD [ "npm", "start" ]

