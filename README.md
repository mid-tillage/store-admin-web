# store-admin-web

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Running the App](#running-the-app)
  - [Development server](#development-server)
  - [Build](#build)
- [Running unit tests](#running-unit-tests)
- [Running end-to-end tests](#running-end-to-end-tests)
- [Docker](#docker)
  - [Image Resource Usage Metrics](#image-resource-usage-metrics)
- [Kubernetes](#kubernetes)
  - [Pod Resource Usage Metrics](#pod-resource-usage-metrics)

## Description

Store's Customer Web page example using [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Installation

```bash
$ npm install
```

## Running the app
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
```bash
# Build the Angular app
npm run build

# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to the dist folder of your Angular application
cd dist/store-admin-web

# Serve the built app using http-server
http-server -o
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Docker

```bash
# Build Docker image
docker build -t store-admin-web:latest -f Dockerfile .

# Run Docker container (with example port mappings and environment variables)
docker run -p 80:80 -e NODE_ENV=production store-admin-web
```

**Note:** To see the porduct list, remember you need the `store-admin-ws` REST API running, and the products loaded into the Postgre database.

### Image resource usage metrics

The table below shows resource usage metrics for the `store-admin-web` Docker container.

| REPOSITORY         | TAG    | IMAGE ID      | CREATED      | SIZE  |
|--------------------|--------|---------------|--------------|-------|
| store-admin-web    | latest | 0d74b59eccb5  | 2 hours ago  | 44MB  |


## Kubernetes

```bash
# Start Minikube to create a local Kubernetes cluster
minikube start

# Configure the shell to use Minikube's Docker daemon
& minikube -p minikube docker-env --shell powershell | Invoke-Expression

# Build Docker image with a specific tag and Dockerfile
docker build -t store-admin-web:latest -f Dockerfile .

# Apply Kubernetes configuration to create a pod
kubectl apply -f kubernetes/pod.yaml

# Port-forward to access the Kubernetes pod locally
kubectl port-forward store-admin-web-pod 80:80
```

### Pod resource usage metrics

The table below shows resource usage metrics for the `store-admin-web-pod` pod.

```bash
minikube addons enable metrics-server
kubectl top pods
```

**Note:** If you just enabled the metrics-server addon, remember to wait a couple of seconds before running the `kubectl top pods` command.


| NAME                 | CPU(cores) | MEMORY(bytes) |
|----------------------|------------|---------------|
| store-admin-web-pod  | 1m         | 10Mi          |

