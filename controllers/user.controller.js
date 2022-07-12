const UserModel = require("../models/user.model");
const Joi = require('@hapi/joi');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
require("../databases/connection")();

const registrar = async(req = request, res=response)=>{

    const schemaRegister = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })
    const { error } = schemaRegister.validate(req.body);

    if(error) return res.status(400).json( { error:error.details[0].message })

    const salt = await bcrypt.genSalt(10)
    
    const password = await bcrypt.hash(req.body.password,salt);

    const { name,email } = req.body;

    const user = new UserModel( { name,email,password } );

    const isEmailExist = await UserModel.findOne({email})

    if (isEmailExist) return res.status(400).json( {error: 'Email ya registrado'} );

    try {
        const usuarioGuardado = await user.save();
        res.status(201).json({
            error:null,
            data:usuarioGuardado
        });
    } catch (error) {
        res.status(400).json(error);
    }

}

const login = async(req = request, res=response)=>{
    
    // validamos los datos ingresados
    const schemaLogin = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })
    const { error } = schemaLogin.validate(req.body);
    if(error) return res.status(400).json( { error:error.details[0].message })

    const { email,password } = req.body;

    // validamos que exista el email
    const usuario = await UserModel.findOne({email})
    if (!usuario) return res.status(400).json( {error: 'Email No existe'} );

    // validamos la contraseña
    const validPass = await bcrypt.compare(password,usuario.password);
    if(!validPass) return res.status(400).json({error: 'Constraseña invalida'})

    // Creando token
    const token = jwt.sign({
        name: usuario.name,
        id: usuario._id
    }, process.env.TOKEN_SECRET)

    console.log(token)

    res.redirect("/");

}

module.exports = {
    registrar,
    login
}