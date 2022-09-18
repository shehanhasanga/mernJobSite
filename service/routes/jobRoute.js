
import express from 'express'
const router = express.Router()

import {createJob, showStat, deleteJob, updateJobs, getAllJobs} from "../controller/jobController.js";

router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStat)
router.route('/:id').delete(deleteJob).patch(updateJobs)

export default router
