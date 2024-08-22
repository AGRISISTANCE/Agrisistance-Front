# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Expose the port on which the app will run
EXPOSE 3000

# Step 8: Command to run the app
CMD ["npm", "run", "preview"]
