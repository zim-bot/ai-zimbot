FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  python \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm i tree-node-cli -g

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]