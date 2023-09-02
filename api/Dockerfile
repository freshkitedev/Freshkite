FROM node:alpine
WORKDIR /app
RUN mkdir api
COPY ./package.json api/
COPY ./package-lock.json api/
COPY ./ api/
RUN cd api; \
    npm i nodemon; \
    npm i; 
WORKDIR /app/api
EXPOSE 9020
CMD ["npm", "run", "start"]

