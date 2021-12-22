/* api/search/:word */

const { searchAll, searchCollection } = require('../controllers/searches.controller');
const { Router } = require("express");
const { validateJWT } =  require('../middlewares/validate-jw')

const router = Router();

router.get('/:word',  validateJWT , searchAll );
router.get('/collection/:table/:word', validateJWT, searchCollection );

 


module.exports= router;