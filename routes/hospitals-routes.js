/* *****       /api/hospitals          */



const { getHospitals, createHospital, updateHospital, deleteHospital } = require( '../controllers/hospitals.controller'); 

const { Router } = require("express");
const { check } = require('express-validator');

const { validateInput } = require('../middlewares/validators');
const { validateJWT } =  require('../middlewares/validate-jw')

const router = Router();

router.get('/', validateJWT, getHospitals );
router.post('/',  
[
    validateJWT,
    check('name', 'el nombre del hospital es obligatorio').not().isEmpty(),
    validateInput
], createHospital );
router.put('/:id',[
    
], updateHospital );
router.delete('/:id', deleteHospital );
 


module.exports= router;