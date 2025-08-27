# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Copy seluruh project ke dalam container
COPY . .

# Expose port Vite (5173)
EXPOSE 5173

# Jalankan Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
