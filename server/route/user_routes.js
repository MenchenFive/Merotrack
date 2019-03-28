const express = require('express');
const router = express.Router();
const dao = require('../controller/DAOUsers');

router.get('/', dao.getAll);
/*router.get('/:id', dao.get);

router.post('/', dao.insert);

router.put('/:id', dao.edit);

router.delete('/:id', dao.delete);*/

module.exports = router;