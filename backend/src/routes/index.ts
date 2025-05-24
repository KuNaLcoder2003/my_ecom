import express from "express"
import userRouter from "./user";
import productRouter from "./product";
import cartRouter from "./cart";
const router = express.Router();


router.use("/user" , userRouter)
router.use('/product' , productRouter)
router.use('/cart' , cartRouter);


export default router;