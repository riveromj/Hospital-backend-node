const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require('../controllers/auth.controller');
const { validateInput } = require('../middlewares/validators');

const router = Router();

router.post('/', [
    check('email',' el email es obligatorio').isEmail(),
    check('password'," el password es obligatorio").not().isEmpty(),
    validateInput
],login );



module.exports = router;