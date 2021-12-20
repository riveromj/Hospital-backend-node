const { response } = require("express");
const { json } = require("express/lib/response");
const jsonwebtoken = require("jsonwebtoken");


const validateJWT = ( req, res = response, next) =>{
    //leer el token

    const token = req.header('x-token');
    
    if (!token){
        return res.status(401).json({
            ok:false,
            msg: "no hay token"
        })
    }
    try {
        const { id } = jsonwebtoken.verify( token, process.env.JWT_SECRETKEY );
        req.id = id; 
        next();
        
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"token invalido"
        })
    }
}

module.exports = {
    validateJWT
}