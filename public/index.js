const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
// const fs = require('fs');
// const config = require('config');


// const fsHelper = require('./fsHelper');
// const strHelper = require('./stringHelper');


const app = express();
const serverPort = process.env.PORT || 5000;

// ================================ 
// MiddleWare Manipulate
//
// ================================ 

// กำหนดให้ Nodejs ทราบว่าพาร์ทที่ประกอบด้วย คำเหล่านี้เป็น static contents
// ไม่ใช่ route
app.use(express.static(path.join(__dirname, 'public/static')));

// รองรับ Post body application/json
app.use(bodyParser.json());
// รองรับ Post body x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// จัดการ HttpResponse, HttpRequest
// ก่อนการเข้าไปทำงานในส่วนต่างๆของ App
app.use((req, res, next) => {

    // Optimize http header
    res.append('X-Content-Type-Options', 'nosniff');
    res.append('X-Frame-Options', 'DENY');
    res.append('X-XSS-Protection', '1; mode=block');

    // Do next process
    next();
});

// การทำ Compression ข้อมูลก่อนส่งกลับไปยัง Client
// app.use(compression({filter: function(req, res){
//     // Don't compressive content before response
//     if(req.headers['x-no-compression']){
//         return false;
//     }

//     console.log('Compression is working ...');
//     return compression.filter(req, res);
// }, chunkSize: 100, level: 9}));
app.use(compression());
// ================================ 
// End
// MiddleWare Manipulate
// ================================ 





// ================================ 
// App. Route Defined
//
// ================================ 
// app.get('/', (req, res) => {
//     res.json(fsHelper);
// });

// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, 'static/pages/home.html'));
// });
// app.post('/putfile', (req, res) => {
//     res.send(`${JSON.stringify(req.body)}`);
// });
// app.get('/stringEncoding/:string', (req, res) => {
//     let buf = Buffer.from(req.params.string);
//     res.send(`${buf.toString('utf-8')}, Length: ${buf.toString('base64')}`);
// });

// app.get('/testString/:str?', (req, res) => {
//     res.send(`String is : ${strHelper().isNullOrEmpty(req.params.str)}`);
// });

// app.get('/write/:content', (req, res) => {
//     fs.writeFile(path.join(__dirname, '/static/file.txt'), req.params.content, { flag: 'w+' }, err => {
//         res.send(err);
//     });
//     res.end();
// });
// app.get('/getImage', (req, res) => {
//     //console.log(typeof fsHelper);
//     //res.sendFile(path.join(__dirname, '/static/image.png'));
//     //console.log(`${req.params.filename}`);
//     //console.log(`${JSON.stringify(req.query)}`);

//     //console.log(`${config.get('app.path.tileset')}`);
//     console.log(`${typeof req.query}`);
//     res.send(fsHelper().readFileBase64(req.query.filename));
//     // res.end();
// });
// ================================ 
// End
// App. Route Defined
// ================================ 



// Start server and write console log running port
app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));