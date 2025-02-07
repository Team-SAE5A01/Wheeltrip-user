# Use build argument to decide environment (default is production)
ARG BUILD_ENV=production

# Base image
FROM node:20-alpine AS base

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies based on environment (development or production)
RUN if [ "$BUILD_ENV" = "development" ]; \
    then npm install; \
    else npm ci --production; \
    fi

# Copy the rest of the application files
COPY . .

# Expose port 3000 for testing or production
EXPOSE 3000

# Run in either development or production mode
CMD if [ "$BUILD_ENV" = "development" ]; \
    then npm run dev; \
    else npm run start; \
    fi
