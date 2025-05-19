



const jwt = require('jsonwebtoken')

import dotenv from "dotenv"

dotenv.config();

interface token {
    token? : string,
    valid : boolean,
    error? : any
}

const key = process.env.SECRET_KEY;

export function generateToken(user_id : string) : token {
    try {
        console.log(key);
        const token = jwt.sign({userId : user_id} , "ihweu9riu@^#*$RI$9ru8t 3o5973t");
        return {
            token : token,
            valid : true
        }
    } catch (error) {
        console.log(error);
        return {
            valid : false ,
            error : error,
        }
    }
}

