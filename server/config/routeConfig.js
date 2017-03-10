var express = require('express');
var router = express.Router();
var apiRoutes = require('../api/routes/index');

module.exports = function(app){
    app.use('/api', apiRoutes);

    app.get('*', function(req, res){
        res.sendfile('./index.html');
    });

};