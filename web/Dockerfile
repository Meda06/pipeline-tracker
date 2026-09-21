FROM node:22-alpine
WORKDIR /app

# Copy manifests first so the npm install layer is cached until dependencies change
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
