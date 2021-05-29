const express = require('express');
const router = express.Router();
const controller = require('./controller');
const uploadFile = require('./middlewares/uploadImage');
const createProductvalidation = require('./middlewares/createProduct');

router.get('/getall', controller.all);

router.post('/store',
    uploadFile.single('image'),
    createProductvalidation,
    controller.store
);

router.put('/update/:id',
    uploadFile.single('image'),
    createProductvalidation,
    controller.update
);

router.delete('/delete/:id', controller.delete);

module.exports = router;