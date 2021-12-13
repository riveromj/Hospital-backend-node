const mongoose = require('mongoose');
//mongodb+srv://usertest:123456aaasss@micluster.kknqj.mongodb.net/hospitaldb
const dbConnection = async ()=>{
   try{
       await mongoose.connect(process.env.DB_CNN,
       {useNewUrlParser: true, useUnifiedTopology: true});
       console.log('DB online')

   }
   catch(err){
    console.log(err);
    throw new Error('error de coneccion con BD');
   }
}

module.exports = {
    dbConnection
}