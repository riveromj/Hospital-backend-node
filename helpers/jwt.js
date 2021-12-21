
const jwt = require('jsonwebtoken');

const generateJWT = async ( id  ) =>{
    
    return new Promise ((resolve, reject ) => {
        const payload = {
            id
        };
    
        jwt.sign( payload , process.env.JWT_SECRETKEY, {
            expiresIn:'12h'
        },(err, token)=>{
            if( err ){
                console.log(err);
                reject('no se pudo generar JWT')
            }else{
                resolve( token )
            }
            
        });
    })
}

module.exports = {
    generateJWT
};