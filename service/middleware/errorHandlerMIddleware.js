import {StatusCodes} from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    let error = {
        code: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message : "Some thing went wrong and try again"
    }
    console.log(err)
    res.status(error.code).json({msg:error.message})
}

export default errorHandlerMiddleware;
