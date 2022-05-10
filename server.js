const express = require('express');

var app = express()
app.get('/sayHi', (req, res) => {
    res.send('Hi!!!!');
});

var server = app.listen(3000, () => {
    console.log(`Server runing on port ${server.address.port}`);
});
console.log('Last line ');