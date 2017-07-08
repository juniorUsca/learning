Sfotipy = {}

// MODELO
Sfotipy.Song = Backbone.Model.extend({})

// COLECCION
Sfotipy.Songs = Backbone.Collection.extend({
    model: Sfotipy.Song
})

// VISTA
Sfotipy.SongView = Backbone.View.extend({
    events: {
        'click .action.icon-plus': 'add'
    },
    tagName: 'li',
    className: 'item border-bottom',
    template: Handlebars.compile( $("#playlist-song-template").html() ),
    initialize: function () {
        // enlaza VISTA con MODELO
        this.listenTo (this.model, "change", this.render, this)
    },
    render: function() {
        var song = this.model
        var html = this.template(song.toJSON())
        this.$el.html(html)
    },
    // EVENTOS
    add: function(e) {
        alert(this.model.get('name'))
        return false
    }

})

Sfotipy.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "album/:name": "album",
        "profile/:username": "profile",
    },

    index: function () {
        console.log("Estoy en index")
    },
    album: function (name) {
        console.log("Estoy en album " + name)
    },
    profile: function (username) {
        console.log("Estoy en profile " + username)
    }
})

Sfotipy.app = new Sfotipy.Router()
Backbone.history.start()

window.Sfotipy = Sfotipy



//*
var song1 = new Sfotipy.Song({name: "song1", author: "Jun"})
var song2 = new Sfotipy.Song({name: "song2", author: "Usca"})
var songs = new Sfotipy.Songs([song1,song2])

var songView = new Sfotipy.SongView({ model: song1, el: $(".list")[1] })
songView.render()

//*/




$(function () {
    Sfotipy.app = new Sfotipy.Router();
});