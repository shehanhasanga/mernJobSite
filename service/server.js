import express from 'express'
import notFoundMiddleware from "./middleware/NotfoudMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMIddleware.js";
import bodyParser from "body-parser";
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'

import auth from './routes/auth.js'
import jobRouter from './routes/jobRoute.js'

import connectDb from "./db/connectDb.js";
import config from "config"
import authUser from './middleware/auth.js'
const dbUrl = config.get("mongoURI");
const app = express()
app.use(cors())
app.get('/', (req, res) => {
    res.send("Welcome")
})
app.use(bodyParser.json())


app.use('/api/v1/auth', auth)
app.use('/api/v1/jobs', authUser , jobRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.use(express.json())
if(process.env.NODE_ENV != 'production'){
    app.use(morgan('dev'))
}
// routes



const port = process.env.PORT || 9000




const start = async () => {
    try{
        await connectDb(dbUrl)
        console.log("connected to db")
    }catch (e) {
        throw new Error("db error")
    }
    app.listen(port , () => {
        console.log("Server is started.... : ")
    })
}

start()
