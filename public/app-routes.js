const fsHelper = require('./fs-helper');
const strHelper = require('./string-helper');
const path = require('path');
const mime = require('mime-types');
const responseFormatter = require('./app-response');
const { equal } = require('assert');


module.exports = (app) => {
    let _this = this;

    _this.build = () => {
        // app.get('/home', (req, res) => {
        //     res.sendFile(fsHelper().getFileRelativePath('/static/pages/home.html'));
        // });

        app.get('/getImage/:groupName/:filename', (req, res) => {
            if(strHelper().isNullOrEmpty(req.params.filename) || req.params.filename.indexOf('..') > -1){
                res.status(403);
                res.append('Content-Type', 'text/html;charset=utf-8');
                res.send('<h1 style="color:#ff0000;text-align:center;">Request Not Allow!!</h1>');
                res.end();
                return;
            }

            //console.log(`${req.params.groupName} - ${req.params.filename}`);
            let filePath = fsHelper().getFileRelativePathByFileGroup(req.params.groupName, req.params.filename);
            if(false === fsHelper().fileExists(filePath, true)){
                res.status(404);
                res.append('Content-Type', 'text/html;charset=utf-8');
                res.send('<h1 style="color:#ff0000;text-align:center;">File not found</h1>');
                return;
            }

            res.sendFile(filePath);
        });


        app.get('/getFileData/:groupName/:filename', (req, res) => {
            if(strHelper().isNullOrEmpty(req.params.filename) || req.params.filename.indexOf('..') > -1){
                res.status(403);
                res.append('Content-Type', 'text/html;charset=utf-8');
                res.send('<h1 style="color:#ff0000;text-align:center;">Request Not Allow!!</h1>');
                res.end();
                return;
            }

            let filePath = fsHelper().getFileRelativePathByFileGroup(req.params.groupName, req.params.filename);
            if(false === fsHelper().fileExists(filePath, true)){
                res.status(404);
                res.append('Content-Type', 'text/html;charset=utf-8');
                res.send('<h1 style="color:#ff0000;text-align:center;">File not found</h1>');
                return;
            }

            const fileData = fsHelper().readFileBase64(filePath, true);
            const fileExtInfo = path.extname(filePath);
            const mimeType = mime.contentType(fileExtInfo);
            res.json({
                fileData: `data:${mimeType};base64, ${fileData}`,
                mimeType: mimeType,
                fileExt: fileExtInfo
            });
            //res.send(`data:${mimeType};base64, ${fileData}`);
        });



        // เขียนข้อมูล Map
        // รับค่าเป็น post body x-wwww-form-urlencoded
        // filename     string ชื่อไฟล์ของ map นามสกุลไฟล์จะเป็น .json
        // content      string เนื้อหาของ map ไฟล์ที่ต้องการเขียนลงไป (base64)
        // backupFlag   string Y/N, Y = เขียน backup file map เดิมไว้ก่อนแล้วค่อยทับข้อมูลใหม่ลงไป
        app.post('/updateMap', (req, res) => {
            if(!req.body.filename || !req.body.content){
                res.json(new responseFormatter(403, 'Parameters filename & content are required'));
                return;
            }else if(!strHelper().strEndWith(req.body.filename, '.json')){
                res.json(new responseFormatter(403, 'File extension not support, Only .json file'));
                return;
            }

            //let jsonStr = Buffer.from(strHelper().getFileData(req.body.content), 'base64').toString('utf-8');
            //res.send(jsonStr);
            //res.json(JSON.parse(jsonStr));
            //return;

            // ข้อมูลไฟล์ที่ต้องการ แก้ไขเนื้อหาของไฟล์
            const fileExt = '.json';
            const sourceFile = fsHelper().getFileRelativePathByFileGroup('map', req.body.filename);
            if(!fsHelper().fileExists(sourceFile, true)){
                res.json(new responseFormatter(404, 'File not found!!'));
                return;
            }

            // backup file เดิมไว้ก่อน
            if(!req.body.backupFlag || req.body.backupFlag === 'Y'){
                // อ่านเนื้อหาของไฟล์เดิม
                const fileContents = fsHelper().readFileBase64(sourceFile, true);

                // สร้างชื่อไฟล์สำหรับ backup
                const filename = req.body.filename.replace(fileExt, '');
                let destFile = '';
                do{
                    destFile = fsHelper().getFileRelativePathByFileGroup('mapBackup', filename.concat('_').concat(new Date().getTime()).concat(fileExt));
                }while(fsHelper().fileExists(destFile));
                
                fsHelper().writeFileBy(destFile, fileContents, 'base64');
            }

            // ปรับปรุงข้อมูลใน json file
            fsHelper().writeFileBy(sourceFile, req.body.content, 'base64');
            res.json(new responseFormatter(200, ''));
        });
    };


    return _this;
};