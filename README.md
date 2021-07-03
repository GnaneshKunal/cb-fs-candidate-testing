# fullstack-candidate-testing

## Instructions

Deployment URL: https://cb-fs-candidate-testing.vercel.app/

### Run locally

1. Install the packages `npm ci`
2. Start the server `npm run dev`
3. Visit `http://localhost:3000/`

### Run locally via docker

1. Build the docker file
```bash
    docker build -t fullstack-candidate-testing .
```
2. Start the container
```bash
    docker run -it --net host fullstack-candidate-testing
```
3. Visit `http://localhost:3000/`

### Run tests

1. Install the packages `npm ci`
2. Start the server `npm run test`
