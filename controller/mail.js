const url = require('url');
const fs = require('fs');
const user_controller = require('../models/user.js');
const mail_controller = require('../models/mail.js');

function getNewId(mail_list){
    let id = 1
    while(mail_list.filter((mail)=>{return mail.id === id}).length !== 0){
        id += 1
    }
    return id
}

function updateVisited(mail_id){
    var mails = mail_cconst
    const fs = require('fs');
    const user_controller = require('../models/user.js');
    const mail_controller = require('../models/mail.js');
}

function getNewId(mail_list){
    let id = 1
    while(mail_list.filter((mail)=>{return mail.id === id}).length !== 0){
        id += 1
    }
    return id
}

function updateVisited(mail_id){
    var mails = mail_controller.getMailList()
    var mail_index = mails.findIndex((mail) => {return mail.id === mail_id})
    if(mail_index !== -1){
        mails[mail_index].visited = true
        mail_controller.saveMailList(mails)
    }
}

exports.getAllMail = function (req, res) {
    const mail = mail_controller.getMailList()
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mail), 'utf-8');
};

exports.getmailReceivedByUser = function (req, res){
    const mail = mail_controller.getMailList()
    const users = user_controller.getUserList()

    let user_id = Number(url.parse(req.url, true).pathname.split('/')[3])
    let required_mails = mail.filter((mail) =>{return mail.destinatario === user_id})
    required_mails = required_mails.map((mail)=>{
        let {id, destinatario, remetente, assunto, visited, date} = mail
        let remetente_name = users.find((user)=>{return user.id === remetente})
        remetente_name = remetente_name ? remetente_name.name : "Usuario apagado"
        return {id, destinatario, remetente, assunto, visited, date, remetente_name}
    })
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(required_mails), 'utf-8');
}

exports.getmailSentByUser = function (req, res){
    const mail = mail_controller.getMailList()
    const users = user_controller.getUserList()

    let user_id = Number(url.parse(req.url, true).pathname.split('/')[3])
    let required_mails = mail.filter((mail) =>{return mail.remetente === user_id})
    required_mails = required_mails.map((mail)=>{
        let {id, destinatario, remetente, assunto, visited, date} = mail
        let destinatario_name = users.find((user)=>{return user.id === destinatario})
        destinatario_name = destinatario_name ? destinatario_name.name : "Usuario apagado"
        return {id, destinatario, remetente, assunto, visited, date, destinatario_name}
    })
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(required_mails), 'utf-8');
}

exports.getmailByUserAndMail = function (req, res){
    const mail = mail_controller.getMailList()
    const users = user_controller.getUserList()
    let requesting_user = Number(url.parse(req.url, true).pathname.split('/')[2])
    let mail_id = Number(url.parse(req.url, true).pathname.split('/')[3])
    let required_mail = mail.find((mail) =>{return mail.id === mail_id})
    if(required_mail !== undefined && required_mail !== -1){
        if(required_mail.destinatario !== requesting_user && required_mail.remetente !== requesting_user){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "User_Dont_Have_Permission",
                message: "Usuario de id "+requesting_user+" não tem permissão para acessar essa mensagem!"
            }));
            return
        }
        if(!required_mail.visited && required_mail.destinatario === requesting_user){
            updateVisited(mail_id)
        }
    
        let remetente_name = users.find((user)=>{return user.id === required_mail.remetente})
        remetente_name = remetente_name ? remetente_name.name : "Usuario apagado"
        let destinatario_name = users.find((user)=>{return user.id === required_mail.destinatario})
        destinatario_name = destinatario_name ? destinatario_name.name : "Usuario apagado"
        
        let {id, destinatario, remetente, assunto, corpo, date} = required_mail
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            id, assunto, corpo, date, destinatario, remetente, remetente_name, destinatario_name
        }), 'utf-8');
    }else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: "Mail_Non_Existent",
            message: "Mensagem de id "+mail_id+" não existe!"
        }));
    }
}

exports.getForwardMail = function (req, res){
    const mail = mail_controller.getMailList()
    const users = user_controller.getUserList()
    let requesting_user = Number(url.parse(req.url, true).pathname.split('/')[3])
    let mail_id = Number(url.parse(req.url, true).pathname.split('/')[4])
    let required_mail = mail.find((mail) =>{return mail.id === mail_id})
    if(required_mail !== undefined && required_mail !== -1){
        if(required_mail.destinatario !== requesting_user && required_mail.remetente !== requesting_user){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "User_Dont_Have_Permission",
                message: "Usuario de id "+requesting_user+" não tem permissão para acessar essa mensagem!"
            }));
            return
        }
        let remetente_name = users.find((user)=>{return user.id === required_mail.remetente})
        remetente_name = remetente_name ? remetente_name.name : "Usuario apagado"
        let destinatario_name = users.find((user)=>{return user.id === required_mail.destinatario})
        destinatario_name = destinatario_name ? destinatario_name.name : "Usuario apagado"
        let {assunto, corpo, date} = required_mail
        
        let forwardCorpo = '<div><hr>'+
        '<h3>Email encaminhado</h3>'+
        '<h2 id="titulo">'+assunto+'</h2>'+
        '<div style="color: gray; display: flex; flex-direction: column;">'+
            '<span>De: '+remetente_name+'</span>'+
            '<span>Para: '+destinatario_name+'</span>'+
            '<span>Recebido em: '+(new Date(date)).toLocaleDateString()+'</span>'+
        '</div>'+
        '<div id="corpo">'+corpo+'</div></div>'

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({forwardCorpo}), 'utf-8');
    }else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: "Mail_Non_Existent",
            message: "Mensagem de id "+mail_id+" não existe!"
        }));
    }
}

exports.getAnswerMail = function (req, res){
    const mail = mail_controller.getMailList()
    const users = user_controller.getUserList()
    let requesting_user = Number(url.parse(req.url, true).pathname.split('/')[3])
    let mail_id = Number(url.parse(req.url, true).pathname.split('/')[4])
    let required_mail = mail.find((mail) =>{return mail.id === mail_id})
    if(required_mail !== undefined && required_mail !== -1){
        if(required_mail.destinatario !== requesting_user && required_mail.remetente !== requesting_user){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "User_Dont_Have_Permission",
                message: "Usuario de id "+requesting_user+" não tem permissão para acessar essa mensagem!"
            }));
            return
        }
        let remetente_name = users.find((user)=>{return user.id === required_mail.remetente})
        remetente_name = remetente_name ? remetente_name.name : "Usuario apagado"
        let destinatario_name = users.find((user)=>{return user.id === required_mail.destinatario})
        destinatario_name = destinatario_name ? destinatario_name.name : "Usuario apagado"
        let {destinatario, assunto, corpo, date} = required_mail
        
        let body = '<div><hr>'+
        '<h3>Email respondido</h3>'+
        '<div style="color: gray; display: flex; flex-direction: column;">'+
            '<span>De: '+remetente_name+'</span>'+
            '<span>Para: '+destinatario_name+'</span>'+
            '<span>Recebido em: '+(new Date(date)).toLocaleDateString()+'</span>'+
        '</div>'+
        '<div id="corpo">'+corpo+'</div></div>'

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({body, destinatario_name, destinatario, assunto}), 'utf-8');
    }else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: "Mail_Non_Existent",
            message: "Mensagem de id "+mail_id+" não existe!"
        }));
    }
}

exports.sendMail = function(req, res){
    var body = ''
    req.on('data', (chunck)=>{
        body += chunck
    })
    req.on('end', ()=>{
        var {destinatario, remetente, assunto, corpo, data_envio} = JSON.parse(body)
        const users = user_controller.getUserList()
        var mails = mail_controller.getMailList()
        if(!users.find((user)=>user.id === destinatario)){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "User_Doesn't_Exist",
                message: "Destinatário não existe!"
            }));
            return
        }
        if(!users.find((user)=>user.id === remetente)){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "User_Doesn't_Exist",
                message: "Remetente não existe!"
            }));
            return
        }
        var new_mail = {
            id: getNewId(mails ? mails : []),
            destinatario,
            remetente,
            assunto,
            corpo,
            visited: false,
            date: data_envio
        }
        mails.push(new_mail)

        mail_controller.saveMailList(mails)
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Email enviado com sucesso"
        }));
    })
}

exports.answerMail = function(req, res){
    var body = ''
    req.on('data', (chunck)=>{
        body += chunck
    })
    req.on('end', ()=>{
        var {mail_id, answering_user, corpo, data_envio} = JSON.parse(body)
        var mails = mail_controller.getMailList()
        let required_mail_index = mails.findIndex((mail) => {return mail.id === mail_id})
        
        if(mails[required_mail_index].destinatario !== answering_user && mails[required_mail_index].remetente !== answering_user){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "User_Dont_Have_Permission",
                message: "Usuario de id "+requesting_user+" não tem permissão para acessar essa mensagem!"
            }));
            return
        }

        if(mails[required_mail_index].destinatario === answering_user){
            mails[required_mail_index].destinatario = mails[required_mail_index].remetente
            mails[required_mail_index].remetente = answering_user
        }
        mails[required_mail_index].visited = false
        mails[required_mail_index].date = data_envio
        mails[required_mail_index].corpo = corpo

        mail_controller.saveMailList(mails)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Email respondido com sucesso"
        }));
    })
}

exports.deleteMail = function(req, res){
    var mail = mail_controller.getMailList()
    
    let requesting_user = Number(url.parse(req.url, true).pathname.split('/')[2])
    let mail_id = Number(url.parse(req.url, true).pathname.split('/')[3])

    let mail_index = mail.findIndex((mail) =>{return mail.id === mail_id})
    if(mail_index !== -1){
        if(mail[mail_index].destinatario !== requesting_user && mail[mail_index].remetente !== requesting_user){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "User_Dont_Have_Permission",
                message: "Usuario de id "+requesting_user+" não tem permissão para acessar essa mensagem!"
            }));
            return
        }
        mail = mail.filter((_, index) => {return index !== mail_index})

        mail_controller.saveMailList(mail)
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Email apagado com sucesso"
        }));
    }else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: "Mail_Non_Existent",
            message: "Mensagem de id "+mail_id+" não existe!"
        }));
    }
}

exports.verifyMails = function(){
    var mails = mail_controller.getMailList()
    const users = user_controller.getUserList()

    mails = mails.filter((mail)=>{
        let det_exist = users.find((user)=>{return user.id === mail.destinatario})
        let rem_exist = users.find((user)=>{return user.id === mail.remetente})
        return det_exist || rem_exist
    })

    mail_controller.saveMailList(mails)
}