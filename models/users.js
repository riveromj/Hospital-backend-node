const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        require:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default: false
    }
})

//cambiar el _id por defecto por id y eliminar de objeto la password

UserSchema.method('toJSON', function (){
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model('User', UserSchema);