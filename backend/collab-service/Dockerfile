FROM node:20-alpine

# Creates the working directory for user service in backend
WORKDIR /app/backend/collab-service

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

ENV POSTGRES_HOST=collab-postgresql

COPY . .

EXPOSE 5001

CMD ["node", "server.js"]