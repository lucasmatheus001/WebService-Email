const url = require('url');
const fs = require('fs');
const user_controller = require('../models/user.js');

function getNewId(user_list){
    let id = 1
    while(user_list.filter((user)=>{return user.id === id}).length !== 0){
        id += 1
    }
    return id
}

exports.getAllUsers = function (req, res) {
    var users = user_controller.getUserList()
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users), 'utf-8');
};

exports.getUsersById = function (req, res){
    var users = user_controller.getUserList()
    let {pathname} = url.parse(req.url, true)

    pathname = pathname.split('/')[2]
    users = users.filter((user)=>{return Number(pathname) === user.id})
    if(users.length !== 0){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const url = require('url');
        const fs = require('fs');
        const user_controller = require('../models/user.js');
    }
}

function getNewId(user_list){
    let id = 1
    while(user_list.filter((user)=>{return user.id === id}).length !== 0){
        id += 1
    }
    return id
}

exports.getAllUsers = function (req, res) {
    var users = user_controller.getUserList()
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users), 'utf-8');
};

exports.getUsersById = function (req, res){
    var users = user_controller.getUserList()
    let {pathname} = url.parse(req.url, true)

    pathname = pathname.split('/')[2]
    users = users.filter((user)=>{return Number(pathname) === user.id})
    if(users.length !== 0){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users[0]), 'utf-8');
    }else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: "User_Non_Existent",
            message: "Usuário de id "+pathname+" não existe!"
        }));
    }
}

exports.addUser = function (req, res){
    var body = ''
    req.on('data', (chunck)=>{
        body += chunck
    })

    req.on('end', ()=>{
        var users = user_controller.getUserList()
        var {user_name} = JSON.parse(body)
        
        if(users.filter((user)=>{return user_name === user.name}).length !== 0){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "Cloned_User_Name",
                message: "Usuário de nome '"+user_name+"' já existe!"
            }));
        }else{
            users.push({
                name: user_name,
                id: getNewId(users)
            })
            user_controller.saveUserList(users)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Usuário salvo com sucesso!"
            }));
        }
    })
}

exports.deleteUser = function (req, res){
    var users = user_controller.getUserList()
    let user = Number(url.parse(req.url, true).pathname.split('/')[2])
    users = users.filter((u)=>{return u.id !== user}) //Retira usuario da lista de usuarios.
    
    user_controller.saveUserList(users)
    require('./mail.js').verifyMails()
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: "Usuário salvo com sucesso!"
    }));
}