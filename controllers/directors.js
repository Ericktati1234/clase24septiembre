const express = require('express');
const {Director} = require('../db') //con esas llaves en Director, solo extraemos aquel que se llama igual
//Ese director ya esta inicializado con el sequelize en el db

//Ahora si vamos a darle vida a nuestra aplicacion

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    //LO que estoy diciendo es que me cree un director con ese nombre y ese apellido, 
    // cada clase de Sequelize tiene definido diversos metodos para insertar, eliminar, 
    //  actualizar, etc, en este caso tenemos el de create

    //NUestro create es una promesa, por lo tanto tiene 2 metodos, .then cuando todo salio bien
    //  y .catch cuando no salio bien o tuvimos una excepcion
    Director.create({
        name: name,
        lastName: lastName
    }).then(object => res.json(object)).catch(ex => res.send(ex));

}

function list(req, res, next) {
    Director.findAll().then(objects => res.json(objects)).catch(ex => res.send(ex));
}

function index(req, res, next) {
    const id = req.params.id;
    Director.findByPk(id).then(object => res.json(object)).catch(ex => res.send(ex));
}

function replace(req, res, next) {
    //EN este se definen parametros por el header y por el body, en el header quien, en el body con que vas a reemplazar
    const id = req.params.id;
    Director.findByPk(id)
            .then(object => {
                const name = req.body.name ? req.body.name : ""; //Aqui estamos diciendo si es que el nombre esta en el body
                                                                    //la variable name es dicho valor, sino es nulo o ""
                const lastName = req.body.lastName ? req.body.lastName : "";
                object.update({
                    name: name,
                    lastName : lastName
                }).then(obj => res.json(obj))
                  .catch(ex => res.send(ex))
            }).catch(ex => res.send(ex));
}

function update(req, res, next) {
    const id = req.params.id;
    Director.findByPk(id)
            .then(object => {
                const name = req.body.name ? req.body.name : object.name; //Aqui estamos diciendo si es que el nombre esta en el body
                                                                            //la variable name es dicho valor, sino es exactamente el mismo que el inicio
                const lastName = req.body.lastName ? req.body.lastName : object.lastName;
                object.update({
                    name: name,
                    lastName : lastName
                }).then(obj => res.json(obj))
                  .catch(ex => res.send(ex))
            }).catch(ex => res.send(ex));
}

function destroy(req, res, next) {
    const id = req.params.id;
    //EN esta funcion es necesario definir ese where ya que solamente buscamos borrar en donde el id sea igual a dicho id
    //      segun la logica del negocio definiremos el parametro
    Director.destroy({ where: { id : id} }).then(object => res.json(object)).catch(ex => res.send(ex));
}

//Para cada uno de los metodos del protocolo http creamos una funcion en funcion del modelo restful
//  dicha funcion, tiene dentro un send, que envia el metodo del protocolo, con la ruta que requiere

module.exports = {create,list,index,replace,update,destroy};

//Por ultimo exportamos todas dichas funciones