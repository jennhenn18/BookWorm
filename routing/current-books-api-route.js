var db = require('../models');

module.exports = function(app) {

// get books ID from the current book table
app.get('/api/currentbooks/', function(req, res){
    db.CurrentBook.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    }).then(function(dbCurrentBook){

        var isbn = dbCurrentBook[0].currentbookid

        $.ajax({
            method: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&printType=books&' + 'key=AIzaSyCpKN7jqCo9yAbysuJQhskHwS6J1JaAdHw'
        }).then(function(result){
            console.log(result)
            res.json(result)
        });
    });
});


// add book to the current book table
app.post('/api/currentbooks/', function(req, res) {
    db.CurrentBook.create({
        currentbookid: req.body.id
    }).then(function(dbCurrentBook){
        res.json(dbCurrentBook)
     });
});


// search Google Books API
app.get('/api/searchbooks/', function(req, res){
    console.log(req.body)
    
    var bookTitle = req.body.title

        $.ajax({
            method: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + bookTitle + '&printType=books&' + 'key=AIzaSyCpKN7jqCo9yAbysuJQhskHwS6J1JaAdHw'
        }).then(function(result){
            console.log(result)
            res.json(result)
        });
       
});


}