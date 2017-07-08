Sfotipy.Views.Song = Backbone.View.extend({
    //tagName: 'li',
    //className: 'item',
    events: {
        'click': 'add',
        'click .action.icon-plus': 'add'
    },
    template: Handlebars.compile( $("#playlist-song-template").html() ),
    initialize: function () {
        // enlaza VISTA con MODELO
        this.listenTo (this.model, "change", this.render, this)
    },
    render: function() {
        var song = this.model
        var html = this.template(song.toJSON())
        //this.$el.html(html)
        this.setElement(html)
        //console.log(this.el)
        return this
    },
    // EVENTOS
    add: function() {
        Sfotipy.app.player.model.set(this.model.toJSON())
        Sfotipy.app.current_song.model.set(this.model.toJSON())
        return false
    }

})