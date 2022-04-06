const fs = require('fs');

exports.saveUserList = function(user_list){
    fs.writeFile('./models/users.json', JSON.stringify(user_list), (err)=>{
        if (err) throw err;
        console.log('Saved new user list!');
    })
}

exports.getUserList =  function(){
    let users = fs.readFileSync('./models/users.json', 'ascii')
    console.log("entrou ",users)
    return users ? JSON.parse(users) : []
}