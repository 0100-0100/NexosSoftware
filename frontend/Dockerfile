FROM node

WORKDIR /frontend

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./package.json

RUN npm install
RUN npm audit fix --force

COPY . ./

EXPOSE 3000
CMD [ "npm", "start" ]
