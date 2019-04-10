//Dependencies setup
const express = require("express");
const app = express();
const morgan = require("morgan"); // HTTP Request logger

//Settings setup
app.set("port", process.env.PORT || 3000);

//Extras
app.use(express.json());
app.use(morgan('dev'));

//Route setup
app.use('/trackapi/users',require('./route/user_routes'));
app.use('/trackapi/vehicles',require('./route/vehicle_routes'));
app.use('/trackapi/user_roles',require('./route/user_roles_routes'));
app.use('/trackapi/trips',require('./route/trips_routes'));

//Start express server
app.listen( app.get("port") , ()=>{
    console.log("Server listening");
});
