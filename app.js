var express     = require("express"),
    app         = express(),
    admin = require("./admin"),
        // parse body from form submission
    bodyParser  = require("body-parser");



// here we set path to our views folder
app.set("views", "./views");

// here we set pattern engine we use
app.set("view engine", "jade");

// middleware to use folders
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
// here we add bodyParse to parse a body of form submission
app.use(bodyParser.urlencoded({extended: true}));
//

// ROUTES
//===============================================

    // Home
app.get('/', function (req, res){
    res.render("index", {title: 'Home'});
});

    // Admin router
app.use('/admin', admin);





app.listen(3000, function(){
    console.log('Run rabbit, run')
});