const express = require('express');
const {Movie,Actor} = require('../db'); //con esas llaves en Genre, solo extraemos aquel que se llama igual
//Ese Genre ya esta inicializado con el sequelize en el db

//Ahora si vamos a darle vida a nuestra aplicacion

function create(req, res, next) {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    Movie.create({
        title: title,
        genreId: genreId,
        directorId: directorId
    }).then(object => res.json(object)).catch(ex => res.send(ex));
}

function addActor(req, res, next) {
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;

    Movie.findByPk(idMovie).then(movie =>{
        Actor.findByPk(idActor).then(actor =>{
            movie.addActor(actor);
            res.json(movie);
        }).catch(ex => res.send(ex));
        }).catch(ex => res.send(ex));
}


function list(req, res, next) {
    Movie.findAll({include:['genre','director']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
}

function index(req, res, next) {
    const id = req.params.id;
    Movie.findByPk(id).then(object => res.json(object)).catch(ex => res.send(ex));
}

function replace(req, res, next) {
    //EN este se definen parametros por el header y por el body, en el header quien, en el body con que vas a reemplazar
    const id = req.params.id;
    Genre.findByPk(id)
            .then(object => {
                const description = req.body.description ? req.body.description : ""; //Aqui estamos diciendo si es que el nombre esta en el body
                                                                    //la variable name es dicho valor, sino es nulo o ""
                const status = req.body.status ? req.body.status : null; 
                object.update({
                    description: description,
                    status: status
                }).then(obj => res.json(obj))
                  .catch(ex => res.send(ex))
            }).catch(ex => res.send(ex));
}

function update(req, res, next) {
    const id = req.params.id;
    Genre.findByPk(id)
            .then(object => {
                const description = req.body.description ? req.body.description : object.description; //Aqui estamos diciendo si es que el nombre esta en el body
                //la variable name es dicho valor, sino es nulo o ""
                const status = req.body.status ? req.body.status : object.status;
                object.update({
                    description: description,
                    status: status
                }).then(obj => res.json(obj))
                  .catch(ex => res.send(ex))
            }).catch(ex => res.send(ex));
}

function destroy(req, res, next) {
    const id = req.params.id;
    //EN esta funcion es necesario definir ese where ya que solamente buscamos borrar en donde el id sea igual a dicho id
    //      segun la logica del negocio definiremos el parametro
    Genre.destroy({ where: { id : id} }).then(object => res.json(object)).catch(ex => res.send(ex));
}

//Para cada uno de los metodos del protocolo http creamos una funcion en funcion del modelo restful
//  dicha funcion, tiene dentro un send, que envia el metodo del protocolo, con la ruta que requiere

module.exports = {create,list,index,replace,update,destroy,addActor};

//Por ultimo exportamos todas dichas funciones