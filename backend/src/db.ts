import mongoose from "mongoose";

mongoose.connect('mongodb+srv://kunal:kunal@cluster0.acncl.mongodb.net/');


const User = new mongoose.Schema({
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
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Product = new mongoose.Schema({
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
    }]
}, { timestamps: true })

const Orders = new mongoose.Schema({
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
    }] , 
    amount : {
        type : Number , 
        required : true
    }
}, { timestamps: true })

const Cart = new mongoose.Schema({
    checked_out: {
        type: Boolean,
        required: true
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ecom_products_table'
        }
    }] , 
    amount : {
        type : Number,
        required :  true
    }
} , {timestamps : true})

