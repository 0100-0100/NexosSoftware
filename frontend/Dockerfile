FROM nginx

FROM node

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src

EXPOSE 3000
CMD ["npm", "start"]
