FROM node:20-alpine

# Creates the working directory for frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]