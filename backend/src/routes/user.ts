import express , {Request , Response} from "express"

enum Status {
    OK = 200,
    ERROR = 500,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
}

interface NewUser {
    first_name : string,
    last_name : string,
    email : string,
    password : string,
    avatar?: string
}


const userRouter = express.Router();



userRouter.post('/signin' , async(req : express.Request , res : express.Response)=>{

    try {
        const newUser : NewUser = req.body;
        const user = await ""
    } catch (error) {
        res.status(Status.ERROR).json({
            message : 'Something went wrong',
            error : error
        })
    }

    
})


export default userRouter;