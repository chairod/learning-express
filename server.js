const express = require('express');

var app = express()
app.get('/sayHi', (req, res) => {
    res.send('Hi!!!!');
});

app.listen(3000, () => {
    console.log(`Server runing on port 3000`);
});

module.exports = app;