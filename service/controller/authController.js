import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from '../error/index.js'
import {UnAuthenticatedError} from "../error/index.js";


const register = async (req, res) => {
    const {name, email , password} =  req.body
    if(!name || !email || !password) {
        throw new BadRequestError("Please provide all values")
    }
    const user = await User.create({name, email, password})
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user : {
        email : user.email, lastname : user.lastname, location: user.location, name : user.name
        }, token, location:  user.location})
    // try {
    //     const user = await User.create(req.body)
    //     res.status(201).json({user})
    //
    // }catch (e) {
    //     next(e)
    // }

}

const login = async (req , res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError("Please provide all values")
    }
    const user = await User.findOne({email}).select('+password')
    console.log(user)
    if(!user){
        throw new UnAuthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user, token, location: user.location})

}

const updateUser = async (req, res ) => {
    const {email, name, lastName, location} = req.body
    if(!email || !name || !lastName || !location){
        throw new BadRequestError("Please enter all values")

    }

    const user = await User.findOne({_id: req.user.userId})
    console.log(user)
    user.email =  email
    user.name = name
    user.location = location
    user.lastName =  lastName
    await user.save()
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user, token, location: user.location})


    res.send("update user")
}

export {register, login , updateUser}

