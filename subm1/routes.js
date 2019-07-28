const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  var age;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><h1>Hello, User</h1><form action="/create-user" method="POST"><input type="text" name="username" placeholder="enter your username"><br><input type="text" name="age" placeholder="enter your age"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<h1>Some users</h1>');
    res.write('<ul><li>User 1.</li><li>User 2.</li></ul>');
    res.write('</html>');
    return res.end();
  }
  
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body);
      var dataArray = parsedBody.toString().split("&");
      dataArray.forEach(pair => {
        var key,value;
        [key,value] = pair.split("=");
        if(key == 'age'){
          age = value;
          res.setHeader('Set-Cookie', `age=${age}`);
        }
        else if(key == 'username'){
          console.log(value);
        }
      });
      
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
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
exports.someText = 'Assignment 1 Vlad I.';