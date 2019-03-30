const db = require('../io/db');

const User = require('../model/user');

const dao = {};

dao.getAll = User.findAll({
    attributes: ['id','name','password']
});

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