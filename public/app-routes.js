const fsHelper = require('./fs-helper');
const strHelper = require('./string-helper');
const path = require('path');
const mime = require('mime-types');


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
    };


    return _this;
};