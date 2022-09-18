import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required: [true, "Please provide a company"],
        maxlength : 20
    },
    position:{
        type:String,
        required: [true, "Please provide a position"],
        maxlength : 100
    },
    status:{
        type:String,
        enum : ['interview', 'decline', 'pending'],
        default : 'pending'
    },
    jobType:{
        type:String,
        enum : ['full-time', 'part-time', 'remote', 'internship'],
        default : 'full-time'
    },
    jobLocation  : {
        type  :String,
        default : "my city",
        required :true
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true , "Please provide a user"]
    }

}, {timestamps : true})


export default mongoose.model('Job', JobSchema)
