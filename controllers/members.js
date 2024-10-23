const express = require('express');
const {Member,Copy} = require('../db') 

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phone =  req.body.phone;
    const status = req.body.status;

    
    Member.create({
        name : name,
        lastName : lastName,
        address : address,
        phone : phone,
        status : status
    }).then(object => res.json(object)).catch(ex => res.send(ex));

}

function doBooking(req, res, next) {
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    Member.findByPk(memberId).then(member =>{
        Copy.findByPk(copyId).then(copy =>{
            member.doBooking(copy);
            res.json(member);
        }).catch(ex => res.send(ex));
        }).catch(ex => res.send(ex));
}

function list(req, res, next) {
    Member.findAll().then(objects => res.json(objects)).catch(ex => res.send(ex));
}

function index(req, res, next) {
    const id = req.params.id;
    Member.findByPk(id).then(object => res.json(object)).catch(ex => res.send(ex));
}

function replace(req, res, next) {
    const id = req.params.id;
    Member.findByPk(id)
            .then(object => {
                const name = req.body.name ? req.body.name : ""; 
                const lastName = req.body.lastName ? req.body.lastName : "";
                const address = req.body.address ? req.body.address : "";
                const phone =  req.body.phone ? req.body.phone : 0 ;
                const status = req.body.status ? req.body.status : 0 ;
                object.update({
                    name : name,
                    lastName : lastName,
                    address : address,
                    phone : phone,
                    status : status
                }).then(obj => res.json(obj))
                  .catch(ex => res.send(ex))
            }).catch(ex => res.send(ex));
}

function update(req, res, next) {
    const id = req.params.id;
    Member.findByPk(id)
            .then(object => {
                const name = req.body.name ? req.body.name : object.name; 
                const lastName = req.body.lastName ? req.body.lastName : object.lastName;
                const address = req.body.address ? req.body.address : object.address;
                const phone =  req.body.phone ? req.body.phone : object.phone ;
                const status = req.body.status ? req.body.status : object.status;
                object.update({
                    name: name,
                    lastName : lastName,
                    address : address,
                    phone : phone,
                    status : status
                }).then(obj => res.json(obj))
                  .catch(ex => res.send(ex))
            }).catch(ex => res.send(ex));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Member.destroy({ where: { id : id} }).then(object => res.json(object)).catch(ex => res.send(ex));
}

module.exports = {create,list,index,replace,update,destroy,doBooking};

