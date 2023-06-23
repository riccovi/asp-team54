  // The main.js file of PixelPulse
module.exports = function(app) {
    app.get("/",function(req, res){
        res.render("index.html")
    });

    app.get("/search",function(req, res) {
        res.render("search.html");
    });

    app.get("/search-result", function (req, res) {
        //searching in the database
        res.send("This is the keyword you entered: " + req.query.keyword + "<br>" + "This is theresult of the search:");
       });

    //route for register action
    app.get("/register", function (req,res) {
        res.render("register.html");
       });
       app.post("/registered", function (req,res) {
        // saving data in database
        res.send("Hello "+ req.body.first + " "+ req.body.last +", you are now registered!");
       });
   }