var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    AlbumView = require('../views/album'),
    $ = require('jquery')

module.exports = Backbone.View.extend({
//Sfotipy.Views.Albums = Backbone.View.extend({
    el: $("#albums"),
    
    template: Handlebars.compile( $("#album-template").html() ),
    initialize: function () {
        // enlaza COLECION con VISTA
        this.listenTo (this.collection, "add", this.addOne, this)
    },
    render: function() {
        this.collection.forEach(this.addOne, this)
    },
    // EVENTOS
    addOne: function(album) {
        var albumView = new AlbumView({ model: album })
        //var albumView = new Sfotipy.Views.Album({ model: album })
        this.$el.append(albumView.render().el)
    }

})