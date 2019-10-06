var db = require('../models');

module.exports = function(app) {
    // get all members for a club
    //===========================================================================
    app.get('/api/members/', function(req, res){
        db.Member.findAll({}).then(function(dbMember){
            console.log(dbMember)
            res.json(dbMember)
        });
    });

    // add a member to the book club - this will be triggered by submitting a new member name and email and hitting a submit button
    // ===========================================================================
    // send the book club id and add it to the member table
    // reload page
    app.post('/api/members/', function(req,res) {
        db.Member.create({
            name: req.body.name,
            email: req.body.email
        }).then(function(dbMember) {
            res.json(dbMember);
        })
    })



    // remove a member from the book club - this will be triggered by an onclick of a delete button
    // ===========================================================================
    app.delete('/api/members/:id', function(req, res) {
        db.Member.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbMember) {
            res.json(dbMember)
        });
    });

}