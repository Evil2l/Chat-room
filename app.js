var express     = require("express"),
    app         = express(),
        // parse body from form submission
    bodyParser  = require("body-parser");
    // morgan will log to console http requests
    // morgan = require("morgan");


// here we add bodyParse to parse a body of form submission
app.use(bodyParser.urlencoded({extended: true}));
// Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());

// here we set path to our views folder
app.set("views", "./views");

// here we set pattern engine we use
app.set("view engine", "jade");

// app.use(morgan("combined"));

// middleware to use folders
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));
// this middleware to debug app, got to be used after static middleware
require("express-debug")(app, {});


// custom middleware
app.use(function(req, res, next){
    console.log(`Incoming message ${req.url}`);
    next();
});


// ROUTES
//===============================================

    // Home
app.get('/', function (req, res){
    res.render("home", {title: 'Home'});
});

var admin = require("./admin");
    // Admin router
app.use('/admin', admin);

var apiRouter = require("./api");
app.use("/api", apiRouter);



app.listen(3000, function(){
    console.log('Run rabbit, run')
});