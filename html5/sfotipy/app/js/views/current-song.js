var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    $ = require('jquery')

module.exports = Backbone.View.extend({
//Sfotipy.Views.CurrentSong = Backbone.View.extend({
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