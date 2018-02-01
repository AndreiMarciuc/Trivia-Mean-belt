const express= require ("express"),
    app= express(),
    bp= require("body-parser"),
    path= require("path"),
    session=require("express-session"),
    port=8000;

app.use(express.static(path.join(__dirname,"./client/dist")));
app.use(bp.json());
app.use(session({secret:"string of choice "}));

require("./server/config/mongoose");
require("./server/config/routes")(app);

app.listen(port, function(){
    console.log("listening:localhost:8000");
});