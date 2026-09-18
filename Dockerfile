# =========================================================================
# LegacyLane — Multi-Stage Production Dockerfile
# =========================================================================
FROM node:20-bookworm-slim AS base

# Install required build tools for better-sqlite3 native compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency manifests for layer caching
COPY package.json ./
COPY Backend/package.json ./Backend/
COPY AI_Modules/package.json ./AI_Modules/
COPY Frontend/package.json ./Frontend/

# Install dependencies across sub-projects
RUN cd Backend && npm install --omit=dev
RUN cd AI_Modules && npm install --omit=dev
RUN cd Frontend && npm install

# Copy application source code
COPY . .

# Build frontend production distribution
RUN cd Frontend && npm run build

# Ensure uploads directory exists for file uploads
RUN mkdir -p Backend/uploads

# Expose the application port
EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "http.get('http://localhost:' + (process.env.PORT || 5000) + '/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

# Launch unified server
CMD ["node", "Backend/index.js"]
