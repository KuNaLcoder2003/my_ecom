import express, { Request, Response } from "express"
import { generateToken } from "../functions/generateTokens";
import { User } from "../db";
const bcrypt = require('bcrypt')

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


const userRouter = express.Router();



userRouter.post('/signup', async (req: Request, res: Response) => {

    try {
        const newUser = req.body as NewUser;
        const user = await User.findOne({ email: newUser.email })
        if (user) {
            res.status(Status.BAD_REQUEST).json({
                message: 'User Already Exists , try logging in',
                valid: false
            })
            return;
        }
        
        const new_user = await User.create(newUser);

        const token = generateToken(new_user._id.toString())

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
        res.status(Status.ERROR).json({
            message: 'Something went wrong',
            error: error
        })
    }


})

userRouter.post('/signin', async () => {

})


export default userRouter;