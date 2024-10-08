const express = require('express');


function create(req, res, next) {
    res.send(`POST => /users/ => ${req.body.name} `);
}

function list(req, res, next) {
    res.send(`GET => /users/`);
}

function index(req, res, next) {
    res.send(`GET => /users/${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`PUT => /users/:id`);
}

function update(req, res, next) {
    res.send(`PATCH => /users/:id`);
}

function destroy(req, res, next) {
    res.send(`DELETE => /users/:id`);
}

//Para cada uno de los metodos del protocolo http creamos una funcion en funcion del modelo restful
//  dicha funcion, tiene dentro un send, que envia el metodo del protocolo, con la ruta que requiere

module.exports = {create,list,index,replace,update,destroy};

//Por ultimo exportamos todas dichas funciones