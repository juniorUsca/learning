var Backbone = require('backbone'),
    Album = require('../models/album.js')

module.exports = Backbone.Collection.extend({
//Sfotipy.Collections.Albums = Backbone.Collection.extend({
    model: Album
})