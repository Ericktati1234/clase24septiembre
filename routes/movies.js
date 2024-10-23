const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');
//Debemos de extraer el archivo de controllers a nuestra ruta de movies, '..' nos sirve para bajar a la carpeta raiz
//  de ahi damos la ruta de controllers/movies, en donde esta nuestro archivo controlador de movies

/* POST create movie. */
router.post('/',controller.create);

/* GET movies listing. */
router.get('/',controller.list);

/* GET movie where id is. */
router.get('/:id',controller.index);

/* PUT replace specific movie */
router.put('/:id',controller.replace);

/* PATCH insert an actor*/
router.patch('/actor',controller.addActor); //es necesario que este metodo este antes del id, ya que id lo detecta como cualquier dato

/* PATCH update specific movie */
router.patch('/:id',controller.update);


/* DELETE delete specific movie */
router.delete('/:id',controller.destroy);

module.exports = router;
