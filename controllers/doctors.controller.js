const { response } = require("express");
const Doctor = require("../models/doctor");

const getDoctors = async ( req, res = response)=>{
    const doctors = await Doctor.find().populate('user','name').populate('hospital','name');
    try {
        res.json({
            ok:true,
            doctors: doctors
        })
    } catch (error) {
        res.json({
            ok:false,
            msg:"error inesperado"
        })
    }
   
}

const createDoctor = async ( req, res = response)=>{
    const id = req.id;
    const doctor = new Doctor({
        user:id,
        ...req.body
    });
    try {
        const doctorBD = await doctor.save();
        res.json( doctorBD );
    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg:" error inesperado"
        })
    }
    
}

const updateDoctor = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:" update Doctor"
    })
} 

const deleteDoctor = ( req, res = response)=>{
     
    try {
        res.json({
            ok:true,
            msg:" delete Doctor"
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"error inesperado"
        })
    }

   
}

module.exports={
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}