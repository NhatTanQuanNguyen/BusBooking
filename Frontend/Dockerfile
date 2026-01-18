FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

RUN npm install

# Copy source
COPY . .

# Build frontend
RUN npm run build

# Expose Vite preview port
EXPOSE 4173

# Serve built frontend
CMD ["npm", "run", "preview", "--", "--host", "--port", "4173"]
