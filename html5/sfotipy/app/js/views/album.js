var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    $ = require('jquery')

module.exports = Backbone.View.extend({  
//Sfotipy.Views.Album = Backbone.View.extend({
    tagName: 'article',
    className: 'song',
    events: {
        'click': 'navigate'
    },
    template: Handlebars.compile( $("#album-template").html() ),
    initialize: function () {
        // enlaza VISTA con MODELO
        this.listenTo (this.model, "change", this.render, this)
    },
    render: function() {
        var album = this.model
        var html = this.template(album.toJSON())
        this.$el.html(html)
        return this
    },
    // EVENTOS
    navigate: function(e) {
        Backbone.app.navigate( "album/" + this.model.get("name"),
        //Sfotipy.app.navigate( "album/" + this.model.get("name"),
            {trigger: true})
        return false
    }

})