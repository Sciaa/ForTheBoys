'use strict';

let express= require('express')
    ,multer = require('multer')
    ,upload = multer()
    ,app = express()

    //Import imgProcessor module which we would implement later
    ,imgProc = require('./imgProcessor');

app.use(express.static('node_modules'));

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname+'/main.html');
});

app.post('/uploadImg', upload.array('pics'), (req, res, next)=>{

    //Call the convertImgs method and pass the image files as its argument
    imgProc.convertImgs(req.files).then((imageStringArray)=>{

        //After all image processing finished, send the base64 image string to client
        res.json(imageStringArray)

    })
});

app.listen(8888, ()=>{
    console.log('Hosted on Port 8888')
});