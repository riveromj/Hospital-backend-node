const { response } = require("express");

//models
const User = require('../models/users');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const searchAll = async (req, res= response)=>{
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

const searchCollection = async (req, res= response)=>{
    const word = req.params.word;
    const table = req.params.table;
    console.log(req.params);
    //expresion regulara para una busqueda 
    const regEx = RegExp( word, 'i');
    let data =[];
    
        switch (table) {
            case 'doctors':
                data = await Doctor.find({name:regEx})
                                    .populate('user','name img')
                                    .populate('hospital','name img')
                break;
            case 'hospitals':
                data = await Hospital.find({name:regEx})
                                        .populate('user','name img')
                break;
            case 'users':
                data = await User.find({ name: regEx});
                break;
        
            default:
                return res.status(400).json({
                    ok:false,
                    msg:'colletion not found'
                });

        }
        res.json({
            ok:true,
            resuls: data
        });
      
}
module.exports={
    searchAll,
    searchCollection
}
