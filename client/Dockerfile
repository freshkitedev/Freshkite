FROM node:alpine
WORKDIR /app
RUN mkdir client
COPY ./package.json client/
COPY ./package-lock.json client/
COPY ./ client/
RUN cd client && npm i 
WORKDIR /app/client
EXPOSE 3000
CMD ["npm", "run", "start"]

