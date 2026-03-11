FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./

RUN yarn install

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "preview"]
