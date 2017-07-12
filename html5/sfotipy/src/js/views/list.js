var Backbone = require('backbone'),
    SongView = require('../views/song'),
    $ = require('jquery')

module.exports = Backbone.View.extend({
//Sfotipy.Views.List = Backbone.View.extend({
    el: $(".playlist > .list"),
    
    initialize: function () {
        // enlaza COLECION con VISTA
        this.listenTo (this.collection, "add", this.addOne, this)
        this.listenTo (this.collection, "reset", this.render, this)
    },
    render: function() {
        this.$el.empty()
        this.addAll()
    },
    // EVENTOS
    addOne: function(song) {
        var songView = new SongView({ model: song })
        //var songView = new Sfotipy.Views.Song({ model: song })
        this.$el.append(songView.render().el)
    },
    addAll: function() {
        this.collection.forEach(this.addOne, this)
    }

})