FROM node:8

RUN mkdir /src
WORKDIR /src

COPY package.json /src
RUN npm install

COPY ./server /src/server
COPY ./workers /src/workers
COPY ./bin /src/bin
COPY ./tests /src/tests


ENV NODE_ENV development

EXPOSE 8081

CMD [ "node", "./bin/www" ]

