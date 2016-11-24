var express = require('express'),
    rooms = require('./data/rooms.json'),
    dummyMessages = require('./data/messages.json'),
    _ = require('lodash'),
    router = express.Router();
var uuid = require("uuid");
    module.exports = router;


router.get('/rooms', function(req, res){
    res.json(rooms);
});
router.route('/rooms/:roomId/messages')
    .get(function(req, res){
        var roomId = req.params.roomId;

        var messages = dummyMessages.filter(m => m.roomId === roomId);

        var room = _.find(rooms, r => r.id === roomId);

        if(!room){
            // if there is no room response would be 404
            res.sendStatus(404);
            return;
        }
        res.json({
            room: room,
            messages: messages
        });


    })
    .post(function (req, res) {
        var roomId = req.params.roomId;
        var text = req.body.text;
        var message = {
            roomId: roomId,
            text: text,
            userId: "44f885e8-87e9-4911-973c-4074188f408a",
            id: uuid.v4()
        };

        dummyMessages.push(message);

        res.sendStatus(200);
    })
    .delete(function(req, res){
        var roomId = req.params.roomId;

        dummyMessages = dummyMessages.filter(m => m.roomId !== roomId);

        res.sendStatus(200);

    });