# Build stage
FROM node:20-alpine as build

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "dev" ]

# Serve stage
FROM node:20-alpine as production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /usr/src/app/build ./build
EXPOSE 80
CMD npm start
