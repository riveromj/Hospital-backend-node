const { response } = require("express")

const getHospitals = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:"hospital"
    })
}

const createHospital = ( req, res = response)=>{

    res.json({
        ok:true,
        msg:" create hospital"
    })
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