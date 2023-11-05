FROM node:alpine as build-stage

# Creates the working directory for frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json over
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Final Nginx base image
FROM nginx:alpine 

COPY --from=build-stage /app/frontend/build /usr/share/nginx/html

COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]