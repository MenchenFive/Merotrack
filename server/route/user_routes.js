const express = require('express');
const router = express.Router();

const user = require('../model/users.js');
const role = require('../model/user_roles.js');

router.get('/', async (req,res) => {
    try {
        res.json( await user.findAll() );
        res.json( "patata" );
    } catch (error) {
        console.log(error);
    }
});

/*router.get('/:id', dao.get);

router.post('/', dao.insert);

router.put('/:id', dao.edit);

router.delete('/:id', dao.delete);*/

module.exports = router;