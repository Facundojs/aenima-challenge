const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage('Write a product name').bail(),
    body('description').notEmpty().withMessage('Write a description'),
	body('price')
		.notEmpty().withMessage('Write a price').bail()
		.isNumeric().withMessage('Just enter numbers').bail(),
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', 'jpeg', '.png', '.gif', '.svg'];

		if (!file) {
			throw new Error('Upload an image');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Extensions accepted are ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	}),
]