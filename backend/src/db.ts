import { text } from "express";
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://kunal:kunal@cluster0.acncl.mongodb.net/');


const User_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Product_Schema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_stock: {
        type: Number,
        required: true
    },
    product_images: [{
        url: {
            type: String,
            required: true
        }
    }],
    category : {
        type : String,
    }
}, { timestamps: true })

Product_Schema.index({product_name : 'text' , product_description : 'text'})

const Orders_Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ecom_users_table'
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ecom_carts_table'
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ecom_products_table'
        }
    }],
    amount: {
        type: Number,
        required: true
    } , 
    
}, { timestamps: true })

const Cart_Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ecom_users_table'
    },
    checked_out: {
        type: Boolean,
        required: false
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ecom_products_table'
        } , 
        product_quantity : {
            type : Number,
            required : true
        }
    }],
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const User = mongoose.model('ecom_users_table', User_schema);
export const Product = mongoose.model('ecom_products_table', Product_Schema);
export const Order = mongoose.model('ecom_orders_table', Orders_Schema);
export const Cart = mongoose.model('ecom_carts_table', Cart_Schema);



