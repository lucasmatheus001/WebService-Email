const http = require('http');
const url = require('url');

var errors = require('./controller/errors.js')
var pages = require('./controller/pages.js')
var mail = require('./controller/mail.js')
var user = require('./controller/user.js')
var styles = require('./controller/styles.js')
var scripts = require('./controller/scripts.js')

var modelUser = require('./models/user.js')


const controller_list = {
    'invalidRequest': errors.invalidRequest,
    'GET':{
        '/': pages.home,
        '/lobby/newMail': pages.newMail,
        '/lobby/answer': pages.answeringMail,
        '/lobby/forward': pages.forwardingMail,
        '/lobby/listMail/received': pages.listReceivedMail,
        '/lobby/listMail/sent': pages.listSentMail,
        '/lobby/listMail/reading': pages.readingMail,

        '/users': user.getAllUsers,
        '/user/:id': user.getUsersById,
        '/mail': mail.getAllMail,
        '/mail/received/:user_id': mail.getmailReceivedByUser,
        '/mail/sent/:user_id': mail.getmailSentByUser,
        '/mail/:user_id/:mail_id': mail.getmailByUserAndMail,
        '/mail/forward/:user_id/:mail_id': mail.getForwardMail,
        '/mail/answer/:user_id/:mail_id': mail.getAnswerMail,

        '/default.css': styles.defaultCSS,
        '/default.js': scripts.defaultJS,
        '/home.css': styles.homeCSS,
        '/favicon.ico': styles.favicon,
    },
    'POST':{
        '/user': user.addUser,
        '/mail': mail.sendMail,
        '/answerMail': mail.answerMail
    },
    'DELETE':{
        '/user/:id': user.deleteUser,
        '/mail/:user_id/:mail_id': mail.deleteMail,
    }
}

module.exports = http.createServer((req, res) => {
    modelUser.getUserList()
    const reqUrl = url.parse(req.url, true)
    let {pathname} = reqUrl

    console.log('Request of type ' + req.method + ' received in endpoint ' + pathname)

    if(req.method === "DELETE"){
        if(pathname.search('user') !== -1){
            pathname = pathname.split('/')
            pathname[2] = ":id"
            pathname = pathname.join('/')
        }else if(pathname.search('mail') !== -1){
            pathname = pathname.split('/')
            pathname[2] = ":user_id"
            pathname[3] = ":mail_id"
            pathname = pathname.join('/')
        }
    }

    // Verifica se ele quer um usuario especifico
    if(pathname.search('user') !== -1 && pathname.split('/').length === 3 && req.method === "GET"){
        pathname = pathname.split('/')
        pathname[2] = ":id"
        pathname = pathname.join('/')
    }

    // Verifica se ele quer as mensagens de um usuario especifico
    if(pathname.search('mail') !== -1 && req.method === "GET"){
        switch(pathname.split('/').length){
            case 4:
                if(pathname.search('received') == -1 && pathname.search('sent') == -1){
                    pathname = pathname.split('/')
                    pathname[2] = ":user_id"
                    pathname[3] = ":mail_id"
                    pathname = pathname.join('/')
                }else{
                    pathname = pathname.split('/')
                    pathname[3] = ":user_id"
                    pathname = pathname.join('/')
                }
                break
            case 5:
                pathname = pathname.split('/')
                pathname[3] = ":user_id"
                pathname[4] = ":mail_id"
                pathname = pathname.join('/')
                break
            default:
                console.log("PathName not implemented")
        }
    }
    
    try{
        controller_list[req.method][pathname](req, res)
    }catch(error){
        console.log(error)
        controller_list['invalidRequest'](req, res)
    }
});