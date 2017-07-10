var Backbone = require('backbone'),
    Albums = require('../collections/albums.js'),
    Songs = require('../collections/songs.js'),
    Album = require('../models/album.js'),
    Song = require('../models/song.js'),
    ListView = require('../views/list.js'),
    PlayerView = require('../views/player.js'),
    CurrentSongView = require('../views/current-song.js'),
    AlbumsView = require('../views/list.js'),
    $ = require('jquery')

module.exports = Backbone.Router.extend({
//Sfotipy.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "album/:name": "album"
    },
    initialize: function () {
        this.current = {}
        this.jsonData = {}
        this.albums = new Albums()
        //this.albums = new Sfotipy.Collections.Albums()
        this.songs  = new Songs()
        //this.songs  = new Sfotipy.Collections.Songs()
        this.playlist  = new ListView({ collection: this.songs })
        //this.playlist  = new Sfotipy.Views.List({ collection: this.songs })
        this.albumlist = new AlbumsView({ collection: this.albums })
        //this.albumlist = new Sfotipy.Views.Albums({ collection: this.albums })
        this.player       = new PlayerView({ model: new Song() })
        //this.player       = new Sfotipy.Views.Player({ model: new Sfotipy.Models.Song() })
        this.current_song = new CurrentSongView({ model: new Song() })
        //this.current_song = new Sfotipy.Views.CurrentSong({ model: new Sfotipy.Models.Song() })

        Backbone.history.start()
    },
    // RUTAS
    index: function () {
        this.fetchData()
    },
    album: function (album_name) {
        if (Object.keys(this.jsonData).length === 0) {
            var self = this
            this.fetchData().done(function () {
                self.addSongs(album_name)
            })
        } else {
            this.addSongs(album_name)
        }
            
    },

    fetchData: function () {
        var self = this

        return $.getJSON('data.json').then(function (data) {
            self.jsonData = data
            for ( var name in data )
                if (data.hasOwnProperty(name))
                    self.addAlbum (name, data[name])
        })
    },
    addSongs: function (album_name) {
        this.songs.reset()
        var albumjson = this.jsonData[album_name]
        this.current.album = this.albums.where({name:album_name})[0].toJSON()
        this.current.album.songs = albumjson.songs
        this.current.album.songs.forEach(this.addSong, this)
    },
    addSong: function (song) {
        var album = this.current.album
        var song_model = new Song({
        //var song_model = new Sfotipy.Models.Song({
            album_cover: album.cover,
            album_name:  album.name,
            author: album.author,
            name: song.name,
            length: song.length
        })
        this.songs.add (song_model)
        if (this.songs.length == 1) {
            this.player.model.set(song_model.toJSON())
            this.current_song.model.set(song_model.toJSON())
        }
    },
    addAlbum: function (name, album) {
        this.albums.add (new Album({
        //this.albums.add (new Sfotipy.Models.Album({
            name: name,
            author: album.author,
            cover:album.cover,
            year: album.year
        }))
    }
})
