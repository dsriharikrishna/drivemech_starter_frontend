FROM node:20-alpine AS builder

# Install curl for healthcheck
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (dev + prod for build)
RUN npm ci

# Copy source code
COPY . .

# Build production bundle
RUN npm run build


FROM node:20-alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Set environment variables from build args (Vite reads these at build time)
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Set working directory
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --only=production --no-optional && npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Health check (same as dev)
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start production server
CMD ["npm", "start"]
