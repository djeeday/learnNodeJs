const fs = require('fs');
const conv = require('iconv-lite');
const querystring = require('querystring');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<p>Hi, user</p>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        const text = 'Text23%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%BE';
        var obl = querystring.unescape(text);
        res.write(obl);
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';