const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");

const fileUploads = (req, res = response)=>{
    const { type , id } = req.params;
    const validType = ['users', 'doctors', 'hospitals'];
    const validExt = ['png', 'jpg', 'jpeg', 'gif'];

    //validar tipo de imagen
    if ( !validType.includes( type )){
        res.status(400).json({
            ok:false,
            msg:' invalid type'
        })
    }

    //validar que exista una imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg:'No files were uploaded.'});
      }

    //leer la imagen
    const file = req.files.image;
    console.log(file);
    const name = file.name.split('.');
    //validar extension
    const ext = name[name.length -1 ];
    if (!validExt.includes( ext.toLowerCase())){
        res.status(400).json({
            ok:false,
            msg:' invalid extension'
        })
    }
    /// generar nombre del archivo
    const nameFile = `${uuidv4()}.${ext.toLowerCase()}`;
   
 
    //path para guarar la imagen
    const path = `./uploads/${ type }/${nameFile}`;
   // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err)
        return res.status(500).json({
            ok:false,
            msg: err
        });

        res.json({ok: true,
            msg:'File uploaded!'});
    });

    //actulizar bd
    updateImage( type, id, nameFile );

}

module.exports={
    fileUploads
}