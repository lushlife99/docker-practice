FROM node as build
WORKDIR /app
COPY package.json /app
RUN npm install --silent
RUN apk add tzdata
COPY . /app
RUN npm run build
COPY . .
CMD ["npm", "start"]