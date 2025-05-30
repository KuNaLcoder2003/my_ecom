import express, { Request, Response } from "express"

import { User, Product, Cart } from "../db";


import mongoose from "mongoose";
import { isUser } from "../middlewares/isUser";
const cartRouter = express.Router();

interface Product_desc {
    product_id: mongoose.Types.ObjectId,
    product_quantity: number,

}

interface Product_arr {
    product_name: string, product_description: string, product_price: number, product_stock: number, _id: mongoose.Schema.Types.ObjectId
}

cartRouter.post('/', isUser, async (req: any, res: Response) => {
    const product_to_add: Product_desc = req.body.product;
    const userId = req.id
    console.log(product_to_add)

    try {
        const product = await Product.findOne({ _id: new mongoose.Types.ObjectId(product_to_add.product_id) })
        if (!product) {
            res.status(403).json({
                message: 'The Product no longer exists',
                valid: false,
            })
            return
        }

        if (product.product_stock < product_to_add.product_quantity) {
            res.status(403).json({
                valid: false,
                message: 'Less stock',
                product: {
                    id: product_to_add.product_id,
                    quantity: product_to_add.product_quantity - product.product_stock
                }
            })
            return
        }

        // check if cart already exixts
        const cart = await Cart.findOne({
            user_id: userId, checked_out: false
        })
        if (!cart) {
            console.log('new cart')
            // create new cart
            let amount = product.product_price * product_to_add.product_quantity
            const new_cart = await Cart.create({
                user_id: userId,
                products: [product_to_add],
                amount: amount,
                checked_out: false
            })

            res.status(200).json({
                valid: true,
                message: 'Added to cart Successfully',
                cart: new_cart
            })
            return
        }

        else {
            // add to existing cart

            let amount = product.product_price * product_to_add.product_quantity

            // const updated = await cart.updateOne({$push : {products : product_to_add} , $inc : {amount : amount}})
            let updated;

            // first check if product already exists

            const existingProductIndex = cart.products.findIndex(
                (product) => product.product_id == product_to_add.product_id
            );

            if (existingProductIndex >= 0) {
                console.log('exists')
                // Product exists: update its quantity
                const existingProduct = cart.products[existingProductIndex];


                const updatedCart = cart.products.map((product) => {
                    if (product.product_id == product_to_add.product_id) {
                        return {
                            product_id: product.product_id,
                            product_quantity : product_to_add.product_quantity > product.product_quantity ? product_to_add.product_quantity + product.product_quantity : product_to_add.product_quantity  
                        }
                    } else {
                        return product
                    }
                })
                console.log(updatedCart)

                

                updated = await cart.updateOne({ products: updatedCart, $inc: { amount: amount } })


            } else {
                // Product doesn't exist: add it to the cart
                updated = await cart.updateOne(
                    { $push: { products: product_to_add }, $inc: { amount: amount } }
                );
            }

            if (!updated) {
                res.status(402).json({
                    valid: false,
                    message: 'Cannot update cart'
                })
                return
            }

            res.status(200).json({
                valid: true,
                message: 'Cart updated'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error : " + error,
            valid: false,
        })
    }

})

cartRouter.get('/products', isUser, async (req: any, res: Response) => {
    const userId = req.id;
    try {
        const cart = await Cart.findOne({ user_id: userId }).populate('products.product_id')
        if (!cart) {
            res.status(404).json({
                message: 'No Active Cart'
            })
            return
        }
        res.status(200).json({
            valid: true,
            cart: cart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error : " + error,
            valid: false,
        })
    }
})

cartRouter.delete('/item' , isUser , async(req : any , res : Response)=> {
    const userId = req.id;
    const product_id= req.body.product;
    console.log(product_id);
    try {
        const cart = await Cart.findOne({user_id : userId})
        if(!cart) {
            res.status(40).json({
                message : 'Bad request',
                valid : false
            })
            return
        }
        const updated_products = cart.products.filter(product => product.product_id != product_id);
        console.log(updated_products)
        const updated = await cart.updateOne({products : updated_products}).populate('products.product_id')
        if(!updated) {
            res.status(402).json({
                message : 'Unable to delete at the moment',
                valid : false
            })
            return;
        }
        res.status(200).json({
            message : 'Product deleted',
            valid : true,
            cart : updated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error : " + error,
            valid: false,
        })
    }
})


export default cartRouter


