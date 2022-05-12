const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const appRoutes = require('./public/app-routes');
const config = require('config');


const app = express();
const serverPort = process.env.PORT || 3000;

// กำหนด Static root path
// ให้กับ Server
// เรียกใช้งานผ่าน Browser domain:port/filename.ext ได้เลย โดยไม่ต้อง Refer พาร์ทที่อยู่ของไฟล์
app.use(express.static(path.join(__dirname, 'public/static/pages')));
//app.use(express.static(path.join(__dirname, 'static')));

// รองรับ Post application/json
app.use(bodyParser.json());
// รอบรับ Post x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Foundation web security protection
app.use((req, res, next) => {

    // Optimize http header
    res.append('X-Content-Type-Options', 'nosniff');
    res.append('X-Frame-Options', 'DENY');
    res.append('X-XSS-Protection', '1; mode=block');

    // ตรวจสอบความถูกต้องของ Http request
    // ทุก คำขอ บังคับให้ระบุ x-http-secure-code เข้ามา
    if(req.headers['x-http-secure-code'] !== config.get('app.secure.simpleAuthenCode')){
        console.log(`Detected required authentication ...`);
        res.status(403);
        res.append('Content-Type', 'text/html;charset=utf-8');
        res.send('<h1 style="color:#ff0000;text-align:center;font-size:20px;">Service not allow, Required to authentication</h1>');
        return;
    }

    next();
});

// Http Compression
app.use(compression());


// Build Application Route
appRoutes(app).build();


app.listen(serverPort, () => {
    console.log(`Server running on port ${serverPort}`)
});


module.exports = app;