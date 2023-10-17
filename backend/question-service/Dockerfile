FROM node:20-alpine

# Creates the working directory for question service in backend
WORKDIR /app/backend/question-service

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4567

CMD ["node", "index.js"]