/*
        /api/users
*/

const { getUsers, createUser } = require( '../controllers/users.controller');

const { Router } = require("express")
const { check } = require('express-validator')

const router = Router();

router.get('/', getUsers );
router.post('/', 
[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail()
], createUser );
 


module.exports= router;