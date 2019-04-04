const express = require('express');
const router = express.Router();

const user = require('../model/users.js');
const role = require('../model/user_roles.js');

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

        res.json( result );

    } catch (error) {
        console.log(error);
    }
});

/*router.get('/:id', dao.get);

router.post('/', dao.insert);

router.put('/:id', dao.edit);

router.delete('/:id', dao.delete);*/



module.exports = router;