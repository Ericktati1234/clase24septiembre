const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
//Debemos de extraer el archivo de controllers a nuestra ruta de users, '..' nos sirve para bajar a la carpeta raiz
//  de ahi damos la ruta de controllers/users, en donde esta nuestro archivo controlador de users

/* POST create user. */
router.post('/',controller.create);

/* GET users listing. */
router.get('/',controller.list);

/* GET user where id is. */
router.get('/:id',controller.index);

/* PUT replace specific user */
router.put('/:id',controller.replace);

/* PATCH update specific user */
router.patch('/:id',controller.update);

/* DELETE delete specific user */
router.delete('/:id',controller.destroy);

module.exports = router;
