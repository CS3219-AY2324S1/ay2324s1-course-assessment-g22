FROM node:20-alpine

# Creates the working directory for user service in backend
WORKDIR /app/backend/user-service

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]