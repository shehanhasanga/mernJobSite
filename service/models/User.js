import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please provide a name"],
        minlength : 3,
        maxlength : 20,
        trim : true
    },
    email : {
        type : String,
        required : [true, "Please provice a email"],
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : "Provide a valid email",

        }

    },
    password: {
        type : String,
        required : [true , "Please provice a password"],
        minlength : 6
    },
    lastName : {
        type :String,
        required : [true, "Please provice a lasename"],
        maxlength: 20,
        default :"last name"
    },
    location : {
        type :String,
        trim :true,
        maxlength : 20,
        default : "my city"
    }
})

UserSchema.pre('save', async function  () {
    const salt =  await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT =  function () {
    return jwt.sign({userId: this._id },  "jwt_secret", {expiresIn: '1d'})
}
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
export default mongoose.model('User', UserSchema)
