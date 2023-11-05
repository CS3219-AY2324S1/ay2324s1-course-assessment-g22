FROM node:20-alpine

# Creates the working directory for history service in backend
WORKDIR /app/backend/history-service

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

ENV POSTGRES_HOST=history-postgresql

COPY . .

EXPOSE 5003

CMD ["node", "server.js"]