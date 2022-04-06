var request = new XMLHttpRequest()

function requestUsers(callback){
    request.open("GET", "http://127.0.0.1:3000/users")
    request.onload = function () {
      callback(JSON.parse(request.responseText))
    }
    request.send()
  }

function pickUser(id, callback){
    request.open("GET", "http://127.0.0.1:3000/user/" + id)
    request.onload = function () {
        callback(JSON.parse(request.responseText))
    }
    request.send()
}

function pickAndUpdateMail(user_id, mail_id, callback){
    request.open("GET", "http://127.0.0.1:3000/mail/"+user_id+"/" + mail_id)
    request.onload = function () {
        callback(JSON.parse(request.responseText))
    }
    request.send()
}

function pickEmailToForward(user_id, mail_id, callback){
    request.open("GET", "http://127.0.0.1:3000/mail/forward/"+user_id+"/" + mail_id)
    request.onload = function () {
        callback(JSON.parse(request.responseText))
    }
    request.send()
}

function pickEmailToAnswer(user_id, mail_id, callback){
    request.open("GET", "http://127.0.0.1:3000/mail/answer/"+user_id+"/" + mail_id)
    request.onload = function () {
        callback(JSON.parse(request.responseText))
    }
    request.send()
}

function pickReceivedMails(user_id, callback){
    request.open("GET", "http://127.0.0.1:3000/mail/received/" + user_id)
    request.onload = function () {
        callback(JSON.parse(request.responseText))
    }
    request.send()
}

function pickSentMails(user_id, callback){
    request.open("GET", "http://127.0.0.1:3000/mail/sent/" + user_id)
    request.onload = function () {
        callback(JSON.parse(request.responseText))
    }
    request.send()
}

function deleteMail(user_id, mail_id, callback){
    request.open("DELETE", "http://127.0.0.1:3000/mail/"+user_id+"/" + mail_id)
    request.onload = function () {
        callback(JSON.parse(request.responseText))
    }
    request.send()
}

function deleteUser(user_id, callback){
    request.open("DELETE", "http://127.0.0.1:3000/user/"+user_id)
    request.onload = function () {
        callback(JSON.parse(request.responseText))
    }
    request.send()
}

function hrefLogged(path, search) {
    window.location = "http://127.0.0.1:3000/" + path + search
}

function filterSearch(search){
    search = search.split('?')[1]
    search = search.split('&&')
    var params = {}
    for(let i in search){
        params[search[i].split('=')[0]] = Number(search[i].split('=')[1])
    }
    return params
}

function logOut() {
    if (window.confirm("Voce tem certeza que quer sair?")) {
        hrefLogged("", "")
    }
}