## Develop
```
docker build -t juscah/portafolio-la --file Dockerfile .
docker run -ti --rm -p 80:8000 -v learning:/data juscah/portafolio-la sh

python -m SimpleHTTPServer
cd src/assets/
stylus -u nib -c -w stylus/main.styl -o css
```