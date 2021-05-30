const { validationResult } = require("express-validator");
const db = require('../database/models');
const serverError = (error, res)=>{
    res.json({
        conectionError:{
            msg: "There was an error with db",
            error
        }
    })
}

module.exports = {
    all: async (req, res) => {
        console.log('ALL');
        try{
            const products = await db.Product.findAll();
            if(products.length > 0){
                res.json({
                    products,
                    total: products.length
                })
            } else {
                res.json({
                    msg:"There is not products in db"
                })
            }

        } catch (error) {
            return serverError(error, res);
        }
    },
    store: async (req, res) => {
        console.log("STORE BODY: ",req.body);
        console.log("STORE FILE: ",req.file);
        try {
            const resultValidation = validationResult(req);

            if(resultValidation.errors.length > 0){
                res.json({
                    errors: resultValidation.errors,
                })
            } else {
                const newProduct = await db.Product.create({
                    ...req.body,
                    image: req.file.filename
                });
                res.json({
                    msg: "Product created",
                    newProduct
                })
            }
            
        } catch (error) {
            return serverError(error, res);
        }
    },
    update: async (req, res) => {
        console.log("UPDATE: ", req.body);
        try {
            const {
                name,
                price,
                description
            } = req.body;
            const id = Number(req.params.id);
            const resultValidation = validationResult(req);
            if(resultValidation.errors.length > 0){
                res.json({
                    errors: resultValidation.errors,
                })
            } else {
                const newProduct = await db.Product.update({
                name,
                price,
                description
                }, { where: { id } })

                const updatedProduct = await db.Product.findByPk(id)
                res.json(updatedProduct)
            }
        } catch (error) {
            return serverError(error, res)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE');
        try {
            const id = Number(req.params.id);
            await db.Product.destroy({
                where: {id}
            })
            res.json({
                msg: "Product deleted"
            })
        } catch (error) {
            return serverError(error, res)
        }

    }
};