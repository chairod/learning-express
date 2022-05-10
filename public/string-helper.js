module.exports = () => {
    let _this = this;

    /**
     * ลบข้อมูลออกจากข้อความ ได้แก่ newline, space, line feed, tab เป็นต้น
     * @param {*} str 
     * @returns [string]
     */
    _this.trim = (str) => {
        return (str || '').replace(/[\t\s\r\n]/ig, '');
    };


    /**
     * ตรวจสอบตัวแปรเป็นค่าว่าง หรือ เป็น null หรือไม่
     * @param {} str 
     * @returns 
     */
    _this.isNullOrEmpty = (str) => {
        return _this.trim(str) === '';
    };


    /**
     * อ่านข้อมูล เนื้อหาของไฟล์จาก base64 file format 
     * @param {*} fileBase64        string ข้อมูลของไฟล์ ที่อยู่ในรูปแบบ data:[file_mime_type];base64,[file_data]
     * @returns [string]
     */
    _this.getFileData = (fileBase64) => {
        return _this.trim(fileBase64).replace(/^.*base64\,/ig, '');
    };

    return _this;
};