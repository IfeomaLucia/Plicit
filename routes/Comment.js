var express = require('express');
var router = express.Router();
var controller = require('../Controllers/Comment');

router.get('/', controller.getAll);
router.post('/add', controller.add);
router.get('/delete/:id', controller.delete);

module.exports = router;
