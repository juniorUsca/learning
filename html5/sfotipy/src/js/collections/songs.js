var Backbone = require('backbone'),
    Song = require('../models/song.js')

module.exports = Backbone.Collection.extend({
//Sfotipy.Collections.Songs = Backbone.Collection.extend({
    model: Song
})