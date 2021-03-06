var db = require('../models');
var axios = require('axios')

module.exports = function(app) {

// get books ID from the next book table
app.get('/api/nextbooks/', function(req, res){
    db.NextBook.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    }).then(function(dbNextBook){


        var isbn = dbNextBook[0].nextbookid
    
        axios({
            method: 'get',
            url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&printType=books&' + 'key=AIzaSyCpKN7jqCo9yAbysuJQhskHwS6J1JaAdHw'
        }).then(function(result){
            res.json(result.data)
        }).catch(function(error) {
            console.log(error)
        });
    });
});


// add book to the nextbook table
app.post('/api/nextbooks/', function(req, res){
    db.NextBook.create({
        nextbookid: req.body.id
    }).then(function(dbNextBook){
        res.json(dbNextBook);
    });
});


}

