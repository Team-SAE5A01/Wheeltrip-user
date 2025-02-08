# Use build argument to decide environment (default is production)
ARG BUILD_ENV=production

# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app if in production mode
RUN if [ "$BUILD_ENV" = "production" ]; then npm run build; fi


# --- Final runtime stage ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public

# Expose port
ARG WHEELTRIP_USER_PORT
EXPOSE $WHEELTRIP_USER_PORT

# Set the command
CMD if [ "$BUILD_ENV" = "development" ]; then npm run dev; else npm run start; fi
