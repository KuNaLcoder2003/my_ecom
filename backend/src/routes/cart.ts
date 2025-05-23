import express, { Request, Response } from "express"
import { generateToken } from "../functions/generateTokens";
import { User, Product, Cart } from "../db";
import { isAdmin } from "../middlewares/isAdmin";
import { uploadImages } from "../functions/cloudinary";
import mongoose from "mongoose";

const cartRouter = express.Router();

interface Product {
    product_name : string , product_description : string , product_price : number , product_stock : number 
}


cartRouter.post('/' , async(req : Request , res : Response)=>{
    const userId = req.body.userid
    const products_to_add : Product[]  = req.body.products;
    const cartId = req.body.cartId
    const ammount = products_to_add.reduce((acc , curr) => acc+ curr.product_price , 0);
    try {
        const exists  = await Cart.find({
            user_id : userId ,  $or : [{checked_out : false} , {_id : cartId}] 
        }); 
        if(exists) {
            const updated = await  exists[0].updateOne({$inc : {amount : ammount} , $push : {products : {$each : products_to_add}}})
            if(!updated) {
                res.status(401).json({
                    valid : false , 
                    message : "Unable to update cart , try again"
                })
                return 
            }
            res.status(200).json({
                message  : 'Updated cart successfully',
                valid : true,
                cart : updated
            })
            return
        }else {

            const new_cart = await Cart.create({
                products : products_to_add,
                amount : ammount
            })
            res.status(200).json({
                message : ' '
            })
        }
    } catch (error) {
        
    }
})


export default cartRouter


