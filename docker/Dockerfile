FROM node:12-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

RUN npm i --no-audit

COPY app/ /usr/src/app/app/
COPY meta.json .babelrc tsconfig.json /usr/src/app/

RUN ./node_modules/.bin/tsc --rootDir app --outDir build && \
    ./node_modules/.bin/babel build --out-dir build

FROM node:12-alpine

WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm i --production --no-audit
COPY --from=build /usr/src/app/build/ /usr/src/app/build
COPY meta.json /usr/src/app/

EXPOSE 3000
CMD ["node", "./build/server.js"]
