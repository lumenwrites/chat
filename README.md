# Pull from dockerhub and run

# Build and run
docker build -t chat:v0.1 .
docker run -d -p 3000:3000 chat:v0.1

