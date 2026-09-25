FROM node:22-alpine
WORKDIR /app

# Copy manifests first so the npm install layer is cached until dependencies change
COPY package*.json ./
RUN npm ci

COPY . .

# The generated Prisma client is git-ignored, so create it here. Generating needs no
# database access, but prisma.config.ts requires DIRECT_URL to be set, hence the placeholder.
RUN DIRECT_URL="postgresql://unused:unused@localhost:5432/unused" npx prisma generate
RUN npm run build

EXPOSE 3001
CMD ["node", "dist/main"]
