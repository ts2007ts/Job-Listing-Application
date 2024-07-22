const path = require('path');
const multer = require('multer');
const fs = require('fs');

const dirPath = path.join('public/files');

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/files');
    },
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, Date.now() + ext);
    }
});

const uploads = multer({
    storage: storage
});

module.exports = uploads;
