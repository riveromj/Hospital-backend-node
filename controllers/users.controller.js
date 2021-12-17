const { response } = require( 'express' );
const { validationResult } = require( 'express-validator' );

const User = require('../models/users');

const getUsers = async (req,res)=>{
    const users = await User.find({}, ' name email role google');
    console.log(users);
    res.json(
        users
)}

const createUser = async (req,res = response)=>{
    const { name , password, email } = req.body;

    const errors = validationResult( req );

    if (!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }
    try {
        const isEmail = User.findOne({email});
        console.log(isEmail,'****************');
        if (isEmail){
            return  res.status(400).json({
                ok:false,
                mgs:'email ya existe'
            })
        }
        const user = new User(req.body);
        await user.save();
        res.json({
           user
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'error inesperado'
        })
    }
  
}

module.exports={
    getUsers,
    createUser
}