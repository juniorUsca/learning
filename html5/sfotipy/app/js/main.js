var Backbone = require('backbone'),
    Router = require('./routers/router.js'),
    $ = require('jquery')

$(function () {
    Backbone.app = new Router();
    //Sfotipy.app = new Sfotipy.Router();
});