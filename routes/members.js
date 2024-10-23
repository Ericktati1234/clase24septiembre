const express = require('express');
const router = express.Router();
const controller = require('../controllers/members');

/* POST create member. */
router.post('/',controller.create);


/* GET members listing. */
router.get('/',controller.list);

/* GET member where id is. */
router.get('/:id',controller.index);

/* PUT replace specific member */
router.put('/:id',controller.replace);

/* PATCH update specific member */
router.patch('/:id',controller.update);

/* DELETE delete specific member */
router.delete('/:id',controller.destroy);

module.exports = router;
