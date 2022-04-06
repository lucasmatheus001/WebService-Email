const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs')

const mkdir = (path) => fs.mkdir(path, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Creating directory " + path)
    }
})

const mkfile = (path, content) => fs.writeFile(path, content, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Creating file " + path)
    }
})

function verifyModels(){
    if(!fs.existsSync('./models')){
        console.log("Directory models doesn't exist!")
        mkdir('./models')
    }
    if(!fs.existsSync('./models/users.json')){
        console.log("File models/users.json doesn't exists!")
        mkfile('./models/users.json', '{"users":[]}')
    }
    if(!fs.existsSync('./models/mail.json')){
        console.log("File models/mail.json doesn't exist!")
        mkfile('./models/mail.json', '[]')
    }
}
verifyModels()

const server = require('./controler.js');

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});