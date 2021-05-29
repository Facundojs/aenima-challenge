const express = require('express');
const router = express.Router();
const controller = require('./controller');
const uploadFile = require('./middlewares/uploadImage');

router.post('/getall', controller.all);

router.post('/store',
    uploadFile.single('image'),
    controller.store
);

module.exports = router;