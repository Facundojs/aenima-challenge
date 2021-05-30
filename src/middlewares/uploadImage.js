const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../images'));
    },
    filename: (req, file, callback) => {
        console.log(req.file);
        callback(null, 'product-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadFile = multer({ storage });

module.exports = uploadFile;