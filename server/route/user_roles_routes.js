const express = require('express');
const router = express.Router();

const user_role = require('../model/user_roles.js');

const randomstring = require("randomstring");

router.get('/', async (req,res) => {
    try {

        let result = await user_role.findAll()

        res.json( {
            result: "OK",
            data: result,
            message: "roles leídos correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer roles: '+error
        } );
        console.log(error);
    }
});

router.get('/:id', async (req,res) => {
    try {
        let {id} = req.params;

        let result = await user_role.findAll({where:{id:id}});

        res.json( {
            result: "OK",
            data: result,
            message: "rol leído correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer rol: '+error
        } );
        console.log(error);
    }
});



module.exports = router;