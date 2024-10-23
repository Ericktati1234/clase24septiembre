const express = require('express');
const router = express.Router();
const controller = require('../controllers/directors');
//Debemos de extraer el archivo de controllers a nuestra ruta de directors, '..' nos sirve para bajar a la carpeta raiz
//  de ahi damos la ruta de controllers/directors, en donde esta nuestro archivo controlador de directors

/* POST create director. */
router.post('/',controller.create);

/* GET directors listing. */
router.get('/',controller.list);

/* GET director where id is. */
router.get('/:id',controller.index);

/* PUT replace specific director */
router.put('/:id',controller.replace);

/* PATCH update specific director */
router.patch('/:id',controller.update);

/* DELETE delete specific director */
router.delete('/:id',controller.destroy);

module.exports = router;
