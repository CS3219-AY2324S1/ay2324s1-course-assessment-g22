[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Setup for PeerPrep

- Add dbAdmin.js in ~/backend/question-service/config ("dbAdmin.js" can be obtained on Canvas Submission from Sharing Assignment Private Info Assignment 5)

```
const username = "REDACTED";
const password = "REDACTED";
const clusterName = "REDACTED";
const databaseName = "REDACTED";
const jwtSecret = "any 256 bit secret";

module.exports = {
  username,
  password,
  clusterName,
  databaseName,
  jwtSecret,
};
```

- Add .env files in `/backend/user-service`, `backend/matching-service`, `backend/collab-service`, `backend/history-service`, `backend/chat-service`
- The content of the .env files are the same, which is the jwtSecret used in dbAdmin.js above

```
POSTGRES_JWT_SECRET="The same 256 bit secret"
```

# Instructions on testing PeerPrep

- Launch Docker (Recommended: Docker Desktop)
- Run `docker compose up --build` in the main directory to build and start up the containers. When the frontend container is up and running, access `localhost:3000` in the browser to test the app.
- If you wish to run the containers in the background, run `docker compose up --build -d` instead
- To stop the containers, run `docker compose stop` or press `CTRL + C`
- To stop and remove the containers, run `docker compose down`

# Cloud Deployment

This app is deployed on Google Cloud Platform (GCP) using Google Kubernetes Engine (GKE).

## Testing PeerPrep on Cloud

- Access http://35.247.174.141/
- In the event that the IP address is changed, refer to [our report on google docs](https://docs.google.com/document/d/1YpUB-q5aCOhER3i9_EstFiJVLXR2czvf3JHKF419nH0/edit?usp=sharing) for the new IP address.

## Steps to deploy PeerPrep on Google Cloud Platform

1. Create your own project in GCP and cluster in GKE
2. Open up your Google Shell. Ensure that it is configured to your selected project
3. git clone the repo into your shell
4. Change directory with commmand `cd ay2324s1-course-assessment-g22/cloudFiles/`
5. Deploy all services first with command `kubectl apply -f <your-service>.yaml`

   - Note: all service files ends with -service.yaml
   - You can check if all services are up with command `kubectl get services`

6. Deploy NGINX ingress with `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml`

   - For NGINX ingress installation help, access [this](https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke)

7. Edit `ingress-resource.yaml` with vim, nano, etc. Change the following in the <> to your frontend IP address.

```
nginx.ingress.kubernetes.io/cors-allow-origin: <frontend-ip-address>
```

8. Deploy ingress-resource.yaml with `kubectl apply -f ingress-resource.yaml`

### Files to edit for Cloud Deployment

9. From the ay2324s1-course-assessment-g22 directory, change directory with `cd frontend/src/` and edit Constants.js with vim, nano, etc
10. change the `NGINX_GATEWAY` to your frontend ip address and save it

```
export const NGINX_GATEWAY = "<YOUR-INGRESS-CONTROLLER-IP-ADDRESS>";
```

11. Change directory to `backend/user-service/`. Create an `.env file`. add the following below and save it.

```
POSTGRES_JWT_SECRET="same 256 bit secret as local test"
FRONTEND_SERVICE_URL="<YOUR-FRONTEND-IP-ADDRESS>" # example "http://123.123.123.123:3000"
POSTGRES_HOST="<YOUR-USER-POSTGRESQL-HOST>"  # "example 123.123.123.123"

```

12. Change directory to `backend/question-service/config`. Create an `.env file`. add the following below and save it.

```
FRONTEND_SERVICE_URL="<YOUR-FRONTEND-IP-ADDRESS>" # example "http://123.123.123.123:3000"

```

13. Change directory to `backend/matching-service`. Create an `.env file`. add the following below and save it.

```
POSTGRES_JWT_SECRET="same 256 bit secret as local test"
FRONTEND_SERVICE_URL="<YOUR-FRONTEND-IP-ADDRESS>" # example "http://123.123.123.123:3000"
POSTGRES_HOST="<YOUR-MATCHING-POSTGRESQL-HOST>"  # "example 123.123.123.123""
RABBITMQ_URL="amqp://<YOUR-RABBITMQ-IP-ADDRESS>" # example "amqp://123.123.123.123:5672"

```

14. Change directory to `backend/history-service`. Create an `.env file`. add the following below and save it.

```
POSTGRES_JWT_SECRET="same 256 bit secret as local test"
FRONTEND_SERVICE_URL="<YOUR-FRONTEND-IP-ADDRESS>" # example "http://123.123.123.123:3000"
POSTGRES_HOST="<YOUR-HISTORY-POSTGRESQL-HOST>"  # "example 123.123.123.123""

```

15. Change directory to `backend/collab-service`. Create an `.env file`. add the following below and save it.

```
POSTGRES_JWT_SECRET="same 256 bit secret as local test"
FRONTEND_SERVICE_URL="<YOUR-FRONTEND-IP-ADDRESS>" # example "http://123.123.123.123:3000"
REDIS_HOST="<YOUR-REDIS-HOST>" # example "123.123.123.123"
```

16. Change directory to `backend/chat-service`. Create an `.env file`. add the following below and save it.

```
POSTGRES_JWT_SECRET="same 256 bit secret as local test"
FRONTEND_SERVICE_URL="<YOUR-FRONTEND-IP-ADDRESS>" # example "http://123.123.123.123:3000"
POSTGRES_HOST="<YOUR-CHAT-POSTGRESQL-HOST>"  # "example 123.123.123.123""
```

### Building images for deployment

17. Login in to your Docker Hub in Google Shell with `Docker login`. [Sign up if you do not have it](https://www.docker.com/products/docker-hub/)

18. Change directory to `frontend/` and run `docker build -t <your-docker-username>/frontend-image:latest .`

- Upload the image to your docker repoistory with `docker push <your-docker-username>/frontend-image:latest`

- Change directory to `cloudFiles/` and edit `frontend-deployment.yaml`. Replace this with your own image

```
image: <your dockerhub username>/frontend-image:latest
```

19. Change directory to `backend/user-service/` and run `docker build -t <your-docker-username>/user-service-image:latest .`

- Upload the image to your docker repoistory with `docker push <your-docker-username>/user-service-image:latest`

- Change directory to `cloudFiles/` and edit `user-service-deployment.yaml`. Replace this with your own image.

```
image: <your dockerhub username>/user-service-image:latest
```

20. Change directory to `backend/question-service/` and run `docker build -t <your-docker-username>/question-service-image:latest .`

- Upload the image to your docker repoistory with `docker push <your-docker-username>/question-service-image:latest`

- Change directory to `cloudFiles/` and edit `question-service-deployment.yaml`. Replace this with your own image.

```
image: <your dockerhub username>/question-service-image:latest
```

21. Change directory to `backend/matching-service/` and run `docker build -t <your-docker-username>/matching-service-image:latest .`

- Upload the image to your docker repoistory with `docker push <your-docker-username>/matching-service-image:latest`

- Change directory to `cloudFiles/` and edit `matching-service-pod.yaml`. Replace this with your own image.

```
image: <your dockerhub username>/matching-service-image:latest
```

22. Change directory to `backend/history-service/` and run `docker build -t <your-docker-username>/history-service-image:latest .`

- Upload the image to your docker repoistory with `docker push <your-docker-username>/history-service-image:latest`

- Change directory to `cloudFiles/` and edit `history-service-deployment.yaml`. Replace this with your own image.

```
image: <your dockerhub username>/history-service-image:latest
```

23. Change directory to `backend/collab-service/` and run `docker build -t <your-docker-username>/collab-service-image:latest .`

- Upload the image to your docker repoistory with `docker push <your-docker-username>/collab-service-image:latest`

- Change directory to `cloudFiles/` and edit `collab-service-deployment.yaml`. Replace this with your own image.

```
image: <your dockerhub username>/collab-service-image:latest
```

24. Change directory to `backend/chat-service/` and run `docker build -t <your-docker-username>/chat-service-image:latest .`

- Upload the image to your docker repoistory with `docker push <your-docker-username>/chat-service-image:latest`

- Change directory to `cloudFiles/` and edit `chat-service-pod.yaml`. Replace this with your own image.

```
image: <your dockerhub username>/chat-service-image:latest
```

### Set up sql configurations for databases

25. Change directory to `backend/user-service/sqlFiles`

- run `kubectl create configmap user-postgresql-config --from-file=userAccountsSchema.sql`

26. Change directory to `backend/matching-service/`

- run `kubectl create configmap matching-schema --from-file=matchingSchema.sql`

27. Change directory to `backend/history-service/`

- run `kubectl create configmap history-schema --from-file=historySchema.sql`

28. Change directory to `backend/chat-service/`

- run `kubectl create configmap chat-schema --from-file=chatSchema.sql`

29. Change directory `cloudFiles/` directory, deploy the rest of the deployment, statefulset and pod files with `kubectl  apply -f <yaml file>`

30. Once everything is running, you can access the frontend ip address to use the application.
