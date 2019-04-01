const db = require('../io/db');

const Users = require('../model/user');

const dao = {};

dao.getAll = function() { 
    return Users.findAll();
};

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

module.exports = dao;