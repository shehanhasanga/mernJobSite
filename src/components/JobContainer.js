
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import {useAppContext} from "../context/appContext";
import {useEffect} from "react";
const JobContainer = () => {
    const {getJobs, jobs, isLoading, page, totalJobs} = useAppContext()
    useEffect(() => {
        getJobs()
    },[])
    if(isLoading){
        return (
            <Loading center={true}/>
        )
    }
    if(jobs.length == 0 ){
        return (
            <Wrapper>
                <h2>No jobs to dosplay....</h2>
            </Wrapper>
        )
    }
    return(
        <Wrapper>
            <h5>{totalJobs} job {jobs.length > 1 && 's'}</h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return (
                        <Job key={job._id} {...job}/>
                    )
                }) }
            </div>
        </Wrapper>
    )
}

export default JobContainer
