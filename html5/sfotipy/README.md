
## Developing
```
docker build -t juscah/stylus .
docker run -ti --rm -v $(pwd):/app juscah/stylus sh
stylus -u nib -c -w stylus/main.styl -o css
```

## Production
```
stylus -u nib -c stylus/main.styl -o css
```


### Dev

The normalize file is from: https://raw.githubusercontent.com/bymathias/normalize.styl/master/normalize.styl

The icons are from: https://icomoon.io/app/#/select
with ```Generate Font```