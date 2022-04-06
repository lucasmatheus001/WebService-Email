const fs = require('fs');

exports.saveMailList = function(mail_list){
    fs.writeFile('./models/mail.json', JSON.stringify(mail_list), (err)=>{
        if (err) throw err;
        console.log('Saved new mail list!');
    })
}

exports.getMailList =  function(){
    let mails = fs.readFileSync('./models/mail.json', 'ascii')
    return mails ? JSON.parse(mails) : []
}

exports.saveMailList = function(mail_list){
    fs.writeFile('./models/mail.json', JSON.stringify(mail_list), (err)=>{
        if (err) throw err;
        console.log('Saved new mail list!');
    })
}

exports.getMailList =  function(){
    let mails = fs.readFileSync('./models/mail.json', 'ascii')
    return mails ? JSON.parse(mails) : []
}