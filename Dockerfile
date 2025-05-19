# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Create logs directory and set full permissions
RUN mkdir -p /app/logs && chmod -R 777 /app/logs

# Expose the port your service runs on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
