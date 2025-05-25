import express, { json, Request, Response } from "express"
import { generateToken } from "../functions/generateTokens";

import { User } from "../db";
import multer from "multer";
import { uploadImage } from "../functions/cloudinary";
import { isAdmin } from "../middlewares/isAdmin";
const bcrypt = require('bcrypt')

const storage = multer.memoryStorage();
const upload = multer({storage : storage})
enum Status {
    OK = 200,
    ERROR = 500,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
}

interface NewUser {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    avatar?: string , 
    role? : string
}

interface Credentials {
    email : string,
    password : string
}


const userRouter = express.Router();

const saltRounds = 10;



userRouter.post('/signup' , upload.single('avatar'), async (req: Request, res: Response) => {

    try {
        const newUser = req.body as NewUser;
        if(!newUser.first_name ||  !newUser.last_name || !newUser.email || !newUser.password || !newUser.role){
            res.status(400).json({
                valid : false,
                message : 'Empty feilds'
            })
            return
        }
        const user = await User.findOne({ email: newUser.email })
        if (user) {
            res.status(Status.BAD_REQUEST).json({
                message: 'User Already Exists , try logging in',
                valid: false
            })
            return;
        }

        const file = req.file as Express.Multer.File;
        if(!file){

            res.status(400).json({
                message : 'Upload avatar',
                valid : false
            })
            return
        }

        const bytes = file.buffer;
        const buffer = Buffer.from(bytes);

        const result = await uploadImage(buffer)

        const hashed = bcrypt.hashSync(newUser.password , saltRounds)

        if(result.err){
            res.status(402).json({
                valid : false,
                message : 'Unable to upload image'
            })
            return
        }

        const {url} = result

        // hash paswword
        
        const new_user = await User.create({
            first_name : newUser.first_name,
            last_name : newUser.last_name,
            email : newUser.email,
            password : hashed,
            role : newUser.role,
            avatar : url
        });

        const token = generateToken(new_user._id.toString() , new_user.role)

        if (!token.valid) {
            res.status(Status.UNAUTHORIZED).json({
                valid : false,
                message : 'Try again'
            })
            return
        }

        res.status(Status.OK).json({
            valid :  true,
            token : token.token,
            message : 'Account created successfully'
        })


    } catch (error) {
        console.log(error);
        res.status(Status.ERROR).json({
            message: 'Something went wrong',
            error: error
        })
    }


})

userRouter.post('/signin', async (req : Request , res : Response) => {
    const userCred = req.body as Credentials
    try {
        if(!userCred.email || userCred.password){
            res.status(400).json({
                valid : false,
                messsge : 'Please enter Email and Password'
            })
            return
        }

        const user = await User.findOne({email : userCred.email})

        if(!user){
            res.status(404).json({
                valid : false,
                message : 'User not found'
            })
            return
        }
        const matched = bcrypt.compareSync(userCred , user.password)

        if(!matched) {
            res.status(401).json({
                message : 'Wrong password',
                valid : true
            })
            return
        }

        const token = generateToken(user._id.toString() , user.role);
        if(!token.valid) {
            res.status(400).json({
                valid : false,
                message : "Error : " + token.error
            })
        }

        res.status(200).json({
            valid :true,
            token : token,
            user : user
        })
    } catch (error) {
        console.log(error);
        res.status(Status.ERROR).json({
            message: 'Something went wrong',
            error: error
        })
    }
})

userRouter.get('/admin' , isAdmin , async(req : any , res: Response)=>{
    const userID = req.id;

    try {
        const user = await User.findOne({_id : userID})

        if(!user) {
            res.status(404).json({
                valid : false,
                message : 'User not found'
            })
            return
        }
        res.status(200).json({
            valid : true,
            user : {
                id : user._id,
                first_name : user.first_name,
                last_name : user.last_name,
                email : user.email,
                avatar : user.avatar,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(Status.ERROR).json({
            message: 'Something went wrong',
            error: error
        })
    }
})


export default userRouter;