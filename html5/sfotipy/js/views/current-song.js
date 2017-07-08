Sfotipy.Views.CurrentSong = Backbone.View.extend({
    el: $(".current"),

    template: Handlebars.compile($("#current-song-template").html()),

    initialize: function () {
        this.listenTo(this.model, "change", this.render, this)
    },

    render: function () {
        var song = this.model.toJSON()
        this.$el.html(this.template(song))
    }
});