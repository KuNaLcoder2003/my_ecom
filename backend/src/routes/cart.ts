import express, { Request, Response } from "express"

import { User, Product, Cart } from "../db";


import mongoose from "mongoose";
const cartRouter = express.Router();

interface Product_desc{
    product_id : mongoose.Types.ObjectId ,
    product_quantity : number ,
   
}

interface Product_arr {
    product_name : string , product_description : string , product_price : number , product_stock : number , _id : mongoose.Schema.Types.ObjectId
}

cartRouter.post('/' , async(req : Request , res : Response)=>{
    const product_to_add : Product_desc = req.body.product;
    const userId = req.body.userid

    try {
        const product = await Product.findOne({_id : new mongoose.Types.ObjectId(product_to_add.product_id)})
        if(!product) {
            res.status(403).json({
                message : 'The Product no longer exists',
                valid : false,
            })
            return
        }

        if(product.product_stock < product_to_add.product_quantity){
            res.status(403).json({
                valid : false,
                message : 'Less stock',
                product : {
                    id : product_to_add.product_id,
                    quantity : product_to_add.product_quantity - product.product_stock
                }
            })
            return            
        }

        // check if cart already exixts
        const cart = await Cart.findOne({
            user_id : userId , checked_out : false
        })
        if(!cart) {
            // create new cart
            let amount = product.product_price * product_to_add.product_quantity
            const new_cart = await Cart.create({
                user_id : userId , 
                products : [{product_to_add}],
                amount : amount
            })

            res.status(200).json({
                valid : true,
                message : 'Added to cart Successfully',
                cart : new_cart
            })
            return
        }

        else {
            // add to existing cart

            let amount = product.product_price * product_to_add.product_quantity

            const updated = await cart.updateOne({$push : {products : product_to_add} , $inc : {amount : amount}})

            if(!updated) {
                res.status(402).json({
                    valid : false,
                    message : 'Cannot update cart'
                })
                return
            } 

            res.status(200).json({
                valid : true,
                message : 'Cart updated'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Error : " + error ,
            valid : false,
        })
    }

})


export default cartRouter


