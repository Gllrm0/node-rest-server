
const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
const _ = require('underscore');

const Usuario = require('../server/models/usuario');

app.get('/usuario', function( req, res ) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite;
    limite = Number(limite)

    Usuario.find({ estado: true }, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec( ( err, usuarios ) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        Usuario.count({ estado: true  }, ( err, conteo ) => {
            res.json({
                ok: true,
                usuarios,
                cantidad: conteo
            });

        });
    });
});

app.post('/usuario', function( req, res ) {

    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        img: body.img,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    })

    usuario.save( (err, usuarioDB ) =>  {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', function( req, res ) {

    let id = req.params.id;
    let body = _.pick( req.body, ['nombre','email','img','role','estado'] );
    Usuario.findByIdAndUpdate(id, body, { new : true, runValidators: true }, ( err, usuarioDB ) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
         });
    })

});

app.delete('/usuario/:id', function( req, res ) {
    
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, ( err, usuarioDB ) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
         });
    })
    } );


module.exports = app;