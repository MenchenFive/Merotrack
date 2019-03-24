//Dependencies setup
const express = require("express");
const app = express();
const morgan = require("morgan"); // HTTP Request logger

//Settings setup
app.set("port", process.env.PORT || 3000);

//Extras
app.use(morgan("dev"));
app.use(express.json());

//Express server start
app.listen( app.get("port") , ()=>{
    console.log("Server listening");
});
