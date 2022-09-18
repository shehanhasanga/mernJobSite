import {UnAuthenticatedError} from "../error/index.js";
import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const header = req.headers
    const authHeader = header.authorization
    console.log("header" + authHeader)
    if(!authHeader){
        throw new UnAuthenticatedError("Authentication Invalid")
    }
    const token = authHeader.split(" ")[1]
    try{
        const payload = jwt.verify(token, "jwt_secret")
        req.user = {userId : payload.userId}

        next()
    }catch (e) {

    }
}

export default authUser
