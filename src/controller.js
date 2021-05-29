const db = require('../database/models');
const { validationResult } = require("express-validator");

const serverError = (error)=>{
    res.json({
        conectionError:{
            msg: "There was an error with db",
            error
        }
    })
}
module.exports = {
    all: async (req, res) => {
        try{
            const products = await db.Product.findAll();
            if(products){
                res.json({
                    products,
                    total: products.length
                })
            }

        } catch (error) {
            return serverError(error);
        }
    },
    store: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if(resultValidation.errors.length > 0){
                const {
                    name,
                    price,
                    description
                } = req.body;
                const { filename } = req.file;
                const newProduct = await db.Product.create({
                    ...req.body,
                    filename
                });
                res.json({
                    msg: "Product created",
                    newProduct
                })
            } else {
                res.json({
                    errors: resultValidation.errors,
                })
            }
            
        } catch (error) {
            return serverError(error);
        }
    }
};