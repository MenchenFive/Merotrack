const db = require('../io/db');

const dao = {};

dao.getAll = (request,response) => {
    response.json({
        respuesta : {
            saludo : "hola"
        }
    });

    db.query("SELECT * FROM USERS",[])
        .then(res => console.log('user:', res.rows[0]))
        .catch(e => setImmediate(() => { throw e }))
    
}

dao.insert = function(){
    //Aqui meto usuarios
}

dao.get = function(){
    //Aqui meto usuarios
}

dao.delete = function(){
    //Aqui meto usuarios
}

dao.update = function(){
    //Aqui meto usuarios
}

dao.user = function(id,name,email,pass,salt,ref_role){
    let user = {};
    
    user.id = id;
    user.name = name;
    user.email = email;
    user.pass = pass;
    user.salt = salt;
    user.ref_role = ref_role;

    return user;
}

module.exports = dao;