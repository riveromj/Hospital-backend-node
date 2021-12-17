const express= require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

//crear el servidor
const app = express();

// configuracion del cors
app.use(cors());

//lectura y parceo body
app.use( express.json());


//base de datos
dbConnection();
console.log(process.env)
//Rutas
app.use( '/api/users', require('./routes/users-routes'))

app.listen(process.env.PORT, ()=>{
    console.log('corriendo el servidor en el puerto '+ process.env.PORT);
})

