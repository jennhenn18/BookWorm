var db = require('../models');

module.exports = function(app) {

// get books ID from the next book table
app.get('/api/nextbooks/', function(req, res){
    db.NextBook.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    }).then(function(dbNextBook){
    res.json(dbNextBook);
    })
})


// add book to the nextbook table
app.put('/api/nextbooks/', function(req, res){
    db.NextBook.create({
        nextbookid: req.body.id
    }).then(function(dbNextBook){
        res.json(dbNextBook);
    });
});


}

