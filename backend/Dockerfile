# Use Node.js official image
FROM node:16

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Expose the app port
EXPOSE 3000

# Set the command to start the application
CMD ["npm", "start"]
