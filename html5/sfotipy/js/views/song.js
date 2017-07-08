Sfotipy.Views.Song = Backbone.View.extend({
    tagName: 'li',
    className: 'item border-bottom',
    events: {
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
        this.$el.html(html)
        return this
    },
    // EVENTOS
    add: function(e) {
        Sfotipy.app.player.model.set(this.model.toJSON())
        return false
    }

})