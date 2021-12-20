const { response } = require( 'express' );

const bcrypt =  require('bcryptjs');

const User = require('../models/users');
const { emit } = require('../models/users');

const getUsers = async (req,res)=>{
    const users = await User.find({}, ' name email role google');
    console.log(users);
    res.json(
        users
)}

const createUser = async (req,res = response)=>{
    const { name , password, email } = req.body;

    try {
        const isEmail =  await User.findOne({email});
        if (isEmail){
            return  res.status(400).json({
                ok:false,
                mgs:'email ya existe'
            })
        }
        const user = new User(req.body);

        //encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        res.json(user)
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'error inesperado'
        })
    }
  
}

const updateUsers = async (req,res = response)=>{
    
        //TODO: validar token y comprobar si es el usuario correcto.
    
    const { id } = req.params;

    try {
        const userId = await User.findById(id);

        if(!userId){
            return res.status(400).json({
                ok:false,
                msg:"User not exist"
            })
        }
        //update user
        const { password, google, email, ...attributes } = req.body;
            const emailExist = await User.findOne({ email });
            
            if (emailExist){
                return res.status(400).json({
                    ok:false,
                    msg:"There is already a user with this email"
                })
            }
            
        /* delete attributes.password;
        delete attributes.google; */
        attributes.email = email;
        const userUpdate = await User.findByIdAndUpdate(userId, attributes, { new: true });
        res.json({
            ok:200,
            user:userUpdate
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
    createUser,
    updateUsers
}