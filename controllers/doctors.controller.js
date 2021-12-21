const { response } = require("express")

const getDoctors = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:"doctor"
    })
}

const createDoctor = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:" create Doctor"
    })
}

const updateDoctor = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:" update Doctor"
    })
} 

const deleteDoctor = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:" delete Doctor"
    })
}

module.exports={
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}