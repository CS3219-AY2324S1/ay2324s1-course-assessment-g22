FROM node:20-alpine

# Creates the working directory for user service in backend
WORKDIR /app/backend/matching-service

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

ENV POSTGRES_HOST=matching-postgresql

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]