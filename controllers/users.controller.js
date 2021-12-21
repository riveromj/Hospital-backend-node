const { response } = require( 'express' );

const bcrypt =  require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req,res)=>{
    const  from  = Number(req.query.from) || 0;
    console.log(from);
    const users = await User.find({}, ' name email role google')
                            .skip(from)
                            .limit(5)
   
    res.json({
        ok:true,
        users,
        //id: req.id
    }
        
    )
}

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
        const token = await  generateJWT (user.id,);
        res.json({
            user,
            token:token
        })
        
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

const deleteUser = async (req, res = response )=>{
    const { id } = req.params;
    try {
        const userId = await User.findById(id);

        if(!userId){
            return res.status(400).json({
                ok:false,
                msg:"User not exist"
            })
        }

        userDelete = await User.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg:"usuario eliminado"
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "error inesperado"
        })
    }
}

module.exports={
    getUsers,
    createUser,
    updateUsers, 
    deleteUser
}