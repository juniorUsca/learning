docker network create foodtrucks
docker run -d --net foodtrucks -p 9200:9200 -p 9300:9300 --rm --name es elasticsearch

docker build -t juscah/foodtrucksweb .
For testing use:
docker run -it --rm --net foodtrucks --name foodtrucks-web juscah/foodtrucksweb bash
For prod use:
docker run -d --net foodtrucks -p 5000:5000 --rm --name foodtrucks-web juscah/foodtrucksweb
