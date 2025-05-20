import { Response, NextFunction } from "express";
const jwt = require('jsonwebtoken')
// ihweu9riu@^#*$RI$9ru8t 3o5973t

export function isAdmin(req: any, res: Response, next: NextFunction) {
    try {
        const authToken = req.headers.authorization;

        if (!authToken || !authToken.startsWith("Bearer ")) {
            res.status(401).json({
                valid: false,
                message: 'Invalid access'
            })
            return
        }

        const token = authToken.split(' ')[1];

        const verified = jwt.verify(token, 'ihweu9riu@^#*$RI$9ru8t 3o5973t');

        if (!verified) {
            console.log('heere 1')
            res.status(401).json({
                valid: false,
                message: 'Invalid access'
            })
            return
        }

        if (verified.role == 'Admin') {

            req.id = verified.userId
            req.role = verified.role
            next()
            console.log('hiiiiiii');
        }

        else {
            console.log('heere 2')
            res.status(401).json({
                valid: false,
                message: 'Invalid access'
            })
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            valid :  false,
            message : 'Something went wrong',
            err : error
        })
    }

}