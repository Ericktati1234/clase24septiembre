const express = require('express');
const {Copy} = require('../db') 

function create(req, res, next) {
    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;

  
    Copy.create({
        number  : number,
        format  : format,
        movieId  : movieId,
        status  : status 
    }).then(object => res.json(object)).catch(ex => res.send(ex));

}

function list(req, res, next) {
    Copy.findAll().then(objects => res.json(objects)).catch(ex => res.send(ex));
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id).then(object => res.json(object)).catch(ex => res.send(ex));
}

function replace(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id)
            .then(object => {
                const number = req.body.number ? req.body.number : "";
                const format = req.body.format ? req.body.format : "";
                const movieId = req.body.movieId ? req.body.movieId : "";
                const status = req.body.status ? req.body.status : "";
                object.update({
                    number  : number,
                    format  : format,
                    movieId  : movieId,
                    status  : status 
                }).then(obj => res.json(obj))
                  .catch(ex => res.send(ex))
            }).catch(ex => res.send(ex));
}

function update(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id)
            .then(object => {
                const number = req.body.number ? req.body.number : object.number;
                const format = req.body.format ? req.body.format : object.format;
                const movieId = req.body.movieId ? req.body.movieId : object.movieId;
                const status = req.body.status ? req.body.status : object.status;
                object.update({
                    number  : number,
                    format  : format,
                    movieId  : movieId,
                    status  : status 
                }).then(obj => res.json(obj))
                  .catch(ex => res.send(ex))
            }).catch(ex => res.send(ex));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.destroy({ where: { id : id} }).then(object => res.json(object)).catch(ex => res.send(ex));
}

module.exports = {create,list,index,replace,update,destroy};
