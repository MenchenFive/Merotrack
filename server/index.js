//Dependencies setup
const express = require("express");
const app = express();
const morgan = require("morgan"); // HTTP Request logger

//Settings setup
app.set("port", process.env.PORT || 3000);

//Extras
app.use(morgan("dev"));
app.use(express.json());

//Route setup
app.use('/trackapi/users',require('./route/user_routes'));

//Start express server
app.listen( app.get("port") , ()=>{
    console.log("Server listening");
});
