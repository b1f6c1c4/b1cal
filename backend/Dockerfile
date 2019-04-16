FROM node:11-alpine

RUN apk --no-cache add yarn

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY VERSION.json server ./

CMD ["yarn", "start:prod"]

EXPOSE 3000
