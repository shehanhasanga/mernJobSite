import Job from "../models/Job.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError, UnAuthenticatedError} from "../error/index.js";

const createJob = async (req, res) => {
    const {position, company} = req.body
    if(!position || !company){
        throw new BadRequestError("Please provide all values")
    }
    req.body.createdBy  = req.user.userId
    const job = Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({jobs, totalJobs : jobs.length , numberOfPages : 1})
}

const updateJobs = async () => {
    res.send("update job")
}

const deleteJob = async () => {
    res.send("delete jobs")
}

const showStat = async () => {
    res.send("show stats")
}

export {createJob, deleteJob, getAllJobs, updateJobs, showStat}
