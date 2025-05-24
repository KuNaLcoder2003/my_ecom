



const jwt = require('jsonwebtoken')




interface token {
    token? : string,
    valid : boolean,
    error? : any
}



export function generateToken(user_id : string , role : string) : token {
    try {
   
        const token = jwt.sign({userId : user_id , role} , "ihweu9riu@^#*$RI$9ru8t 3o5973t");
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

