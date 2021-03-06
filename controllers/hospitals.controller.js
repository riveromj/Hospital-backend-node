const { response } = require("express");

const  Hospital   = require('../models/hospital');

const getHospitals = async ( req, res = response)=>{
    const hospitals = await Hospital.find()
                                    .populate('user','name');
    try {
        res.json({
            ok:true,
            hospitals: hospitals
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"error inesperado"
        });
    }
  
}

const createHospital = async ( req, res = response)=>{
    const id  = req.id;
    const hospital = new Hospital({
        user: id,
        ...req.body
    });

    try {
        
        const hospitalDB = await hospital.save();

    res.json({
        ok:true,
        msg:" create hospital",
        hospital: hospitalDB
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:" error inesperado"
        })
    }
}

const updateHospital = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:" update hospital"
    })
}

const deleteHospital = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:" delete hospital"
    })
}

module.exports={
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}