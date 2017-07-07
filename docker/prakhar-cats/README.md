
docker build -t juscah/catnip .

docker run -d -p 8888:5000 --rm juscah/catnip




docker login
docker push juscah/catnip
