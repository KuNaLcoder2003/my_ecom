import express, { Request, Response } from "express"
import { generateToken } from "../functions/generateTokens";
import { User, Product } from "../db";
import multer from "multer";
import { isAdmin } from "../middlewares/isAdmin";
import { uploadImages } from "../functions/cloudinary";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


interface Product {
    product_name: string, product_description: string, product_price: number, product_stock: number , category : string
}

const productRouter = express.Router();

productRouter.post('/', isAdmin, upload.array('images'), async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const { product_name, product_description, product_price, product_stock , category } = req.body as Product;
        if (!product_description || !product_name || !product_price || !product_stock) {
            res.status(400).json({
                valid: false,
                message: 'Important fields empty'
            })
            return;
        }
        const files = req.files as Express.Multer.File[];

        let buffer_array: Buffer[] = [];

        if (files.length == 0) {
            res.status(400).json({
                valid: false,
                message: 'No images uploaded'
            })
            return;
        }

        files.forEach(file => {
            const bytes = file.buffer;
            buffer_array.push(Buffer.from(bytes))
        })



        const result = await uploadImages(buffer_array)


        const urls = result.map(item => {
            return { url: item.url }
        })

        const new_product = await Product.create({
            product_name: product_name,
            product_description: product_description,
            product_price: product_price,
            product_stock: product_stock,
            product_images: urls,
            category : category
        })

        res.status(200).json({
            valid: true,
            message: 'Product added successfully',
            new_product
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            valid: false,
            message: 'Something went wrong',
            err: error
        })
    }
})

productRouter.get('/search/:searchValue', async (req: Request, res: Response) => {
    const searchValue = req.params.searchValue
    console.log(searchValue);
    try {
        if (!searchValue) {
            res.status(400).json({
                valid: false,
                message: 'No value to search'
            })
            return
        }
        const products = await Product.find({
            $text: {
                $search: searchValue,
                $caseSensitive: false
            }
        })

        if (products.length == 0) {
            res.status(404).json({
                message: 'No products found',
                valid: false
            })
            return
        }

        const arr = products.map((prouct) => {
            return {
                id: prouct._id,
                name: prouct.product_name
            }
        })

        res.status(200).json({
            valid: true,
            products: arr
        })





    } catch (error) {

        console.log(error);
        res.status(500).json({
            valid: false,
            message: 'Something went wrong',
            err: error
        })

    }
})

productRouter.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.find({})
        if (products.length == 0) {
            res.status(402).json({
                valid: false,
                message: 'Cannot fetch products at the moment'
            })
            return
        }
        const products_arr = products.map((item) => {
            return {
                id: item._id,
                name: item.product_name,
                price: item.product_price,
                stock: item.product_stock,
                image : item.product_images[0]
            }
        })
        res.status(200).json({
            valid: true,
            products: products_arr
        })
        console.log(products_arr)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

productRouter.get('/item/:id' , async(req :Request , res : Response)=> {
    const id = req.params.id
    
    try {
        if(!id || id.length < 8) {
            res.status(400).json({
                message : 'Bad request , can not fetch product',
                valid : false
            })
            return
        }  

        const product = await Product.findOne({_id : id})

        if(!product) {
            res.status(404).json({
                message : 'Product not found',
                valid : false,
            })
            return
        }

        res.status(200).json({
            valid : true,
            product : {
                id : product._id,
                name : product.product_name,
                desc : product.product_description,
                images : product.product_images,
                price : product.product_price
            }
        })
    } catch (error) {
         res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

export default productRouter