const fs = require('fs')

exports.defaultJS = function (req, res) {
    fs.readFile('./controller/pages/default.js', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(content, 'utf-8');
    });
};


exports.defaultJS = function (req, res) {
    fs.readFile('./controller/pages/default.js', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(content, 'utf-8');
    });
};

