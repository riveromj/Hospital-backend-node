
/*          api/uploads/ */

const { fileUploads } = require('../controllers/upload-file.controller');
const { Router } = require("express");
const fileUpload = require('express-fileupload');
const { validateJWT } =  require('../middlewares/validate-jw')

const router = Router();

router.use(fileUpload());
router.put('/:type/:id',  validateJWT , fileUploads  );



module.exports= router;