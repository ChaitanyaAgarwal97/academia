FROM node:16.19.0-alpine3.16
WORKDIR /academia
COPY ./package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --omit=dev; \
    fi

COPY . ./
EXPOSE 3000
CMD [ "npm", "run", "prod" ]
