var express = require("express"),
        // define express router
    router = express.Router(),
        // random id
    uuid        = require("uuid"),
        // get dummy JSON data
    roomData    = require("./data/rooms.json"),
        // library with additional methods
    _           = require("lodash");

module.exports  = router;

// Rooms
router.get('/rooms', function (req, res){
    res.render('rooms', {
        title: "Admin room",
        rooms: roomData
    });
});

router.route('/rooms/add')
// Add view

    .get(function (req, res){
        res.render('add');

    })
// Add request
    .post(function (req, res){

        var room = {
            name: req.body.name,
            id: uuid.v4()
        };

        roomData.push(room);

        res.redirect(res.baseUrl +'/rooms')
    });

// Edit view
router.route('/rooms/edit/:id')
    .get(function(req, res){

        var roomId = req.params.id;

        var room = _.find(roomData, r => r.id === roomId);

        if(!room){
            // if there is no room response would be 404
            res.sendStatus(404);
            return;
        }

        res.render("edit", { room });
    })

// Edit request
    .post(function (req, res){

        var roomId = req.params.id;

        var room = _.find(roomData, r => r.id === roomId);

        room.name = req.body.name;

        res.redirect(res.baseUrl +'/rooms')
    });

// Delete
router.get('/rooms/delete/:id', function(req, res){
    var roomId = req.params.id;
    roomData = roomData.filter(r => r.id !== roomId);
    res.redirect(res.baseUrl +'/rooms');
});


