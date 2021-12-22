/* api/search/:word */

const { search } = require('../controllers/searches.controller');
const { Router } = require("express");
const { check } = require('express-validator');

const { validateInput } = require('../middlewares/validators');
const { validateJWT } =  require('../middlewares/validate-jw')

const router = Router();

router.get('/:word',  validateJWT , search );

 


module.exports= router;