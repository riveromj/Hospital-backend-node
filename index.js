const express= require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

//crear el servidor
const app = express();

// configuracion del cors
app.use(cors());


//base de datos
dbConnection();
console.log(process.env)
//Rutas
app.get('/', (req,res)=>{
    res.json({
        ok:true,
        msg:"hola mundo"
    })
})

app.listen(process.env.PORT, ()=>{
    console.log('corriendo el servidor en el puerto '+ process.env.PORT);
})

