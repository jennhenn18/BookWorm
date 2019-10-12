// link dependencies
var express = require('express');
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

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

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// import routes
require('./routing/current-books-api-route')(app);
// require('./routing/next-books-api-route')(app);
require('./routing/events-api-route')(app);
require('./routing/api-routes')(app);
require('./routing/member-api-routes')(app);
require('./routing/html-routes')(app);

// sync our sequelize models and start the express app
db.sequelize.sync({ force: false}).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
}).catch(function(error) {
    console.log(error)
});