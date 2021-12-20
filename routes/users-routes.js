/*
        /api/users
*/

const { getUsers, createUser, updateUsers } = require( '../controllers/users.controller');

const { Router } = require("express")
const { check } = require('express-validator')

const { validatorInput } = require('../middlewares/validators')

const router = Router();

router.get('/', getUsers );
router.post('/', 
[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validatorInput
], createUser );
router.put('/:id',[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('role', 'el role es obligatorio').not().isEmpty(),
    validatorInput
], updateUsers );
 


module.exports= router;