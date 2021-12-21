/*
        /api/doctors
*/

const { getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor } = require( '../controllers/doctors.controller');

const { Router } = require("express");
const { check } = require('express-validator');

const { validateInput } = require('../middlewares/validators');
const { validateJWT } =  require('../middlewares/validate-jw')

const router = Router();

router.get('/',  getDoctors);
router.post('/', 
[
    validateJWT
], createDoctor );
router.put('/:id',[
    
], updateDoctor );
router.delete('/:id', deleteDoctor );
 


module.exports= router;