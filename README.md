# practical-test-ntd-front

Challenge created for a role in NTD Software. This repository contains the Frontend of the application, in Vue.js.

The Backend in Java is located in the repository:

https://github.com/vinhadelli/practical-test-ntd-backend

## How to run

How to run the application

### Locally

Execute the command `docker-compose -f local.docker-compose.yml up -d`. It will build the image of the aplication, pointing to the API that should be listening at the port 8080 from the localhost. The Vue Aplication will be listening at the port 5173.

### Pointing to the Cloud

Execute the command `docker-compose -f cloud.docker-compose.yml up -d`. It will build the image of the aplication, pointing to the API hosted in my own cloud, at the address https://ntdcalculatorapi.fenrir.app.br. The Vue Aplication will be listening at the port 5173.

## Testing the aplication

### Automated Tests
