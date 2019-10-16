var path = require('path');

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // show login screen on homepage
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/assets/html/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/assets/html/signup.html"));
  });
  
  // load dashboard
  // app.get("/dashboard", function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/assets/html/dashboard.html"));
  // });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/dashboard.html"));
  });

}