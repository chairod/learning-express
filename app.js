const express = require('express');
//const path = require('path');
//const compression = require('compression');
//const bodyParser = require('body-parser');
//const appRoutes = require('./public/app-routes');


const app = express();
const serverPort = process.env.PORT || 5000;

// กำหนด Static root path
// ให้กับ Server
// เรียกใช้งานผ่าน Browser domain:port/filename.ext ได้เลย โดยไม่ต้อง Refer พาร์ทที่อยู่ของไฟล์
//app.use(express.static(path.join(__dirname, 'public/static/pages')));
//app.use(express.static(path.join(__dirname, 'static')));

// รองรับ Post application/json
//app.use(bodyParser.json());
// รอบรับ Post x-www-form-urlencoded
//app.use(bodyParser.urlencoded({extended: true}));

// Foundation web security protection
// app.use((req, res, next) => {

//     // Optimize http header
//     res.append('X-Content-Type-Options', 'nosniff');
//     res.append('X-Frame-Options', 'DENY');
//     res.append('X-XSS-Protection', '1; mode=block');

//     // Process to next
//     next();
// });

// Http Compression
//app.use(compression());


// Build Application Route
//appRoutes(app).build();
app.get('/sayHi', (req, res) => {
    res.send('Hi, Developer');
});




const server = app.listen(serverPort, () => {
    console.log(`[LOG] : Server running on port ${server.address().port}`);
});