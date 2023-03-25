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
CMD ["npm", "run", "start"]
EXPOSE 9020
