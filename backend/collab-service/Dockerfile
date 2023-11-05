FROM node:20-alpine

# Creates the working directory for user service in backend
WORKDIR /app/backend/collab-service

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

ENV POSTGRES_HOST=collab-postgresql
ENV HISTORY_SERVICE_URL=http://history-service:5003
ENV REDIS_HOST=collab-redis

COPY . .

EXPOSE 5001

CMD ["node", "server.js"]