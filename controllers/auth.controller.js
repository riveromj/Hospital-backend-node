const { response } = require("express");
const bcrypt =  require('bcryptjs');

const { generateJWT } =  require('../helpers/jwt')

const User =  require('../models/users');
const req = require("express/lib/request");

const login =  async (req, res = response)=>{
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        if (!userDB){
            res.status(404).json({
                ok:false,
                msg:" usuario incorrecto"
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if (!validPassword){
            res.status(404).json({
                ok:false,
                msg:" usuario incorrecto"
            });
        }



        //TODO: generer jwt
        const token = await generateJWT( userDB.id );
        res.json({
            ok:true,
            token: token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"error inesperado"
        })
    }
}

module.exports = {
    login
}