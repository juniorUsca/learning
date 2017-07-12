
## Develop
```
docker build -t juscah/sfotipy-dev --file Dockerfile-dev .
docker run -ti --rm -p 80:8080 -v $(pwd)/src:/app/src -v $(pwd)/public:/app/public -v $(pwd)/server:/app/server juscah/sfotipy-dev sh
```

```npm run stylus``` or
```npm run build``` or
```npm run start```



## Production
```
docker build -t juscah/sfotipy --file Dockerfile-prod .
docker run -d --rm -p 80:8080 --name sfotipy juscah/sfotipy
docker logs -f sfotipy
```



### Developing Stylus
```
docker build -t juscah/stylus .
docker run -ti --rm -v $(pwd):/app juscah/stylus sh
stylus -u nib -c -w stylus/main.styl -o css
```

### Developing Backbone
```
docker build -t juscah/sfotipy .
docker run -ti --rm -v $(pwd):/app juscah/sfotipy sh
npm install --no-bin-links
npm run bundle
node server.js
```



## Dev

- The normalize file is from: https://raw.githubusercontent.com/bymathias/normalize.styl/master/normalize.styl

- The icons are from: https://icomoon.io/app/#/select
    with ```Generate Font```

- Use imagemin from:
    https://github.com/jessfraz/dockerfiles/blob/master/imagemin/Dockerfile


### Backbone

```
// Creacion de un modelo
var Song = Backbone.Model.extend({})

// Instancia de un modelo
var song = new Song();
var song = new Song({ name: "boom" , author: "Junior"})
song.toJSON()

//EVENTOS
// Se ejecuta cuando algun elemento cambia(ejem. name, author)
song.on("change", function(){})
song.off("change")

// Se ejecuta cuando el author cambia
song.on("change:author", function(){})
song.off("change:author")

// Eventos personalizados
song.on("playing", function(){})
song.trigger("playing")

// VISTAS
var SongView = Backbone.View.extend({})
var view = new SongView()
view.el // div

var SongView = Backbone.View.extend({ tagName: 'li', className: 'item border-bottom', id:'song1'})

var view = new SongView({ model: song })

// COLLECTIONS
var Coleccion = Backbone.Collection.extend({model: Song})
var song1 = new Song({ name: "boom1" , author: "Junior"})
var song2 = new Song({ name: "boom2" , author: "Junior"})
var songs = new Coleccion([song1,song2])

```