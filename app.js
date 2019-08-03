const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('First Middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Second Middleware');
//   res.send('<p>Assignment solved (almost!)</p>');
// });
// console.log('hello');


app.use('/users', (req, res, next) => {
    console.log('/users middleware');
    res.write('<p>The Middleware that handles just /users</p>');
    res.end();
});

app.use('/us', (req, res, next) => {
    console.log('/us middleware');
    res.write('<p>The Middleware that handles just /us</p>');
    res.end();
});


app.use('/', (req, res, next) => {
    console.log('/ middleware');
    console.log('one more / middleware');
    res.write('<p>The Middleware that handles just /</p>');
    res.end();
});


app.listen(2000);
