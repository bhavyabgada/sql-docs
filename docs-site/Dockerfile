FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Docusaurus site
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"] 