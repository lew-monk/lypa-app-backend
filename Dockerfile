# Stage 1: Build the application
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the application (if needed)
RUN yarn run build