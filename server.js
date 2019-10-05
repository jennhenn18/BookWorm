// link dependencies
var express = require('express');

// setup express app
var PORT = process.env.PORT || 8080;
var app = express();

// add model folder for data syncing
var db = require('./models');

// setup data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add static directory
app.use(express.static('public'));

// import routes
// require('./routing/books-api-route')(app);
require('./routing/member-api-routes')(app);
require('./routing/html-routes')(app);

// syinc our sequelize models and start the express app
db.sequelize.sync({ force: false}).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});