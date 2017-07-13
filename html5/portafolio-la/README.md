## Develop
```
docker build -t juscah/portafolio-la --file Dockerfile .
docker run --rm -p 80:8000 -v $(pwd)/src:/app/src juscah/portafolio-la
```