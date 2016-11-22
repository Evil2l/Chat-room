var express = require("express"),
    app = express();


app.set("views", "./views");

// middleware to use folders
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));


app.get('/', function (req, res){
    res.render('index.jade');
});
app.get('/rooms', function (req, res){
    res.render('rooms.jade');
});



app.listen(3000, function(){
    console.log('Run rabbit, run')
});