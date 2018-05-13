FROM node:boron

ARG bot_api_key
ARG chat_id

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY app/env.config.template.ts ./app/env.config.ts

RUN  sed -i "s/botApiKey: \"\"/botApiKey: \"${bot_api_key}\"/" ./app/env.config.ts
RUN  sed -i "s/chatId: \"\"/chatId: \"${chat_id}\"/" ./app/env.config.ts
RUN npm i

COPY . .
RUN npm test

EXPOSE 3000
CMD ["npm", "start"]