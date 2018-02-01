var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");
var mp = path.join(__dirname, "./../models");
mongoose.connect('mongodb://localhost/belt_examdb');
fs.readdirSync(mp).forEach(function (file) {
    if (file.indexOf('.js') > 0) {
        require(mp + "/" + file);
    }
});