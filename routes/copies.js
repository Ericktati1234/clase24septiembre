const express = require('express');
const router = express.Router();
const controller = require('../controllers/copies');

/* POST create copies. */
router.post('/',controller.create);

/* GET copies listing. */
router.get('/',controller.list);

/* GET copies where id is. */
router.get('/:id',controller.index);

/* PUT replace specific copies */
router.put('/:id',controller.replace);

/* PATCH update specific copies */
router.patch('/:id',controller.update);

/* DELETE delete specific copies */
router.delete('/:id',controller.destroy);

module.exports = router;
