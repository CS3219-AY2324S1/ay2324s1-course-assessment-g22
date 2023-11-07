FROM node:20-alpine

# Creates the working directory for user service in backend
WORKDIR /app/backend/chat-service

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

ENV POSTGRES_HOST=chat-postgresql

COPY . .

EXPOSE 5002

CMD ["node", "server.js"]