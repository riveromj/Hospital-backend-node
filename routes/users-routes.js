/*
        /api/users
*/

const { getUsers, createUser, updateUsers, deleteUser } = require( '../controllers/users.controller');

const { Router } = require("express");
const { check } = require('express-validator');

const { validateInput } = require('../middlewares/validators');
const { validateJWT } =  require('../middlewares/validate-jw')

const router = Router();

router.get('/',  validateJWT , getUsers );
router.post('/', 
[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validateInput
], createUser );
router.put('/:id',[
    validateJWT,
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('role', 'el role es obligatorio').not().isEmpty(),
    validateInput
], updateUsers );
router.delete('/:id', validateJWT, deleteUser );
 


module.exports= router;