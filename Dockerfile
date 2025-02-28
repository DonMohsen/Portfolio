
FROM node:18.19.0

# Set working directory
WORKDIR /app

# Copy package.json and lock file before installing dependencies
COPY package.json package-lock.json ./

# Copy the entire prisma folder (including schema.prisma) to the container
COPY prisma ./prisma  

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate  

# Copy the rest of the app files
COPY . .  

# # Build the Next.js application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000  

# Run the app in production mode
CMD ["npm", "run", "start"]
