const fs = require('fs')

exports.home = function (req, res) {
    fs.readFile('./controller/pages/home.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.forwardingMail = function (req, res) {
    fs.readFile('./controller/pages/forwardingMail.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.answeringMail = function (req, res) {
    fs.readFile('./controller/pages/answeringMail.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.newMail = function (req, res) {
    fs.readFile('./controller/pages/newMail.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.listReceivedMail = function (req, res) {
    fs.readFile('./controller/pages/userReceivedMails.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.listSentMail = function (req, res) {
    fs.readFile('./controller/pages/userSentMails.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.readingMail = function (req, res) {
    fs.readFile('./controller/pages/readingMail.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.home = function (req, res) {
    fs.readFile('./controller/pages/home.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.forwardingMail = function (req, res) {
    fs.readFile('./controller/pages/forwardingMail.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.answeringMail = function (req, res) {
    fs.readFile('./controller/pages/answeringMail.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.newMail = function (req, res) {
    fs.readFile('./controller/pages/newMail.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.listReceivedMail = function (req, res) {
    fs.readFile('./controller/pages/userReceivedMails.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.listSentMail = function (req, res) {
    fs.readFile('./controller/pages/userSentMails.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};

exports.readingMail = function (req, res) {
    fs.readFile('./controller/pages/readingMail.html', 'utf8', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
};