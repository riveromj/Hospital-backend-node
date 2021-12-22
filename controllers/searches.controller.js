const { response } = require("express");
const User = require('../models/users');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const search = async (req, res= response)=>{
    const word = req.params.word;
    //expresion regulara para una busqueda 
    const regEx = RegExp( word, 'i');
    try {
        /* const users =  await User.find({ name: regEx});
        const doctors = await Doctor.find({name:regEx});
        const hospital = await Hospital.find({name:regEx}); */

        const [ users, doctors, hospitals] = await Promise.all([  
            User.find({ name: regEx}),
            Doctor.find({name:regEx}),
            Hospital.find({name:regEx})]);

        res.json({
            ok:true,
            users,
            doctors,
            hospitals,
            termino:word
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false, msg:
            "error inesperdo"
        })
    }
}
module.exports={
    search
}
