const express = require('express');
const router = express.Router();

const user = require('../model/users.js');
const role = require('../model/user_roles.js');

const randomstring = require("randomstring");

const addRoleToUser = async (data) => {
    return Promise.all(
        data.map(
            async element => {
                element.dataValues.role = await role.findAll( { where: { id:element.dataValues.refRole } } );
            }
        )
    );
}

router.get('/', async (req,res) => {
    try {

        let result = await user.findAll()//.map( (r) => (r.toJSON()));

        /*for (let u of result) {
            u.a = await role.findAll({where:{id:u.refRole}});
        }*/

        await addRoleToUser (result);

        res.json( {
            result: "OK",
            data: result,
            message: "Usuarios leídos correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer usuarios: '+error
        } );
        console.log(error);
    }
});

router.get('/:id', async (req,res) => {
    try {
        let {id} = req.params;

        let result = await user.findAll({where:{id:id}});

        await addRoleToUser (result);

        res.json( {
            result: "OK",
            data: result,
            message: "Usuario leído correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer usuario: '+error
        } );
        console.log(error);
    }
});

router.post('/', async (req,res) => {
    try {
        let {name, email, password, refRole} = req.body;

        console.log(req.body)

        let newUser = await user.create({
            name,
            email,
            password,
            salt: randomstring.generate(8),
            refRole,
        },{
            fields: ["name","email","password","salt","refRole"]
        });

        if (newUser){
            res.json( {
                result: "OK",
                data: newUser,
                message: "Usuario introducido correctamente"
            } );
        }else{
            res.json( { 
                result:"FAILED",
                data: {},
                message: "Error al insertar usuario" 
            } );
        }

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al insertar usuario: '+error
        } );
        console.log(error);
    }
});

router.put('/:id', async (req,res) => {
    try {
        let {id} = req.params;
        let {name, email, password, refRole} = req.body;

        let userMod = await user.findAll({where:{id:id}});

        if (userMod.length == 1){
            await userMod.forEach(async (user) => {
                user.update({
                    name: name ? name : userMod.name,
                    email: email ? email : userMod.email,
                    password: password ? password : userMod.password,
                    refRole: refRole ? refRole : userMod.refRole
                });
            });
            res.json( {
                result: "OK",
                data: userMod,
                message: "Usuario actualizado correctamente"
            } );
        }else{
            res.json({ 
                result:"FAILED",
                data: {},
                message: 'Error al actualizar usuario'
            });
        }

    } catch (error) {
        console.log(error);
        res.json({ 
            result:"FAILED",
            data: {},
            message: 'Error al actualizar usuario: '+error
        });
    }
});

router.delete('/:id', async (req,res) => {
    try {
        let {id} = req.params;

        let deletedRows = await user.destroy({
            where: {
                id: id
            }
        });

        res.json({ 
            result:"OK",
            data: {},
            message: 'Usuarios borrados correctamente',
            count: deletedRows
        });

    } catch (error) {
        console.log(error);
        res.json({ 
            result:"FAILED",
            data: {},
            message: 'Error al borrar usuario: '+error
        });
    }
});



module.exports = router;