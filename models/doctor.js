const { Schema, model} = require('mongoose');

const DoctorShema = Schema({
    name:{
        type:String,
        require:true
    },
    img:{
        type:String,
    },
   user:{
       type: Schema.Types.ObjectId,
       ref:'User',
       require: true
   },
   ///para varios hospitales [] en este caso solo se relaciona con uno
   hospital:{
    type: Schema.Types.ObjectId,
    ref:'Hospital',
    require: true
}
})

module.exports = model('Doctor', DoctorShema);