var path = require('path');

var db = require('../models');

module.exports = function(app) {

// index route loads dashboard 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/dashboard.html"));
  });

}