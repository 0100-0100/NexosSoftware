FROM node

WORKDIR /frontend

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./package.json

RUN npm install

COPY . ./

RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD [ "serve", "-s", "build" ]
