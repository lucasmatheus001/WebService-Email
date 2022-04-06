const url = require('url');
const fs = require('fs')

exports.homeCSS = function (req, res) {
    fs.readFile('./controller/pages/home.css', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(content, 'const url = require("url")');
        const fs = require('fs')
    });
}

exports.homeCSS = function (req, res) {
    fs.readFile('./controller/pages/home.css', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(content, 'utf-8');
    });
};

exports.defaultCSS = function (req, res) {
    fs.readFile('./controller/pages/default.css', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(content, 'utf-8');
    });
};

exports.favicon = function (req, res){
    fs.readFile('./controller/pages/favicon.ico', function(error, content) {
        if(error) throw error
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end(content, 'utf-8');
    });
}