import {Formrow, Alert, FormSelect} from '../../components/index.js'
import {useAppContext} from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJobs = () => {
    const {showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions,
        status, statusOptions, isEditing, handleChange,clearValues, isLoading, createJob } = useAppContext()
    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({name, value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!position || !company || !jobLocation){
            displayAlert()
            return
        }
        if(isEditing){
            return
        } else {
            createJob()
        }

    }
    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing?"edit job":"add job"}</h3>
                {showAlert && <Alert/>}
                <div className="form-center">
                    <Formrow type="text" name="position" value={position} handleChange={handleInput}/>
                    <Formrow type="text" name="company" value={company} handleChange={handleInput}/>
                    <Formrow type="text" labelText="job location" name="jobLocation" value={jobLocation} handleChange={handleInput}/>
                    <FormSelect  name="status" value={status} handleChange={handleInput} list={statusOptions} />
                    <FormSelect  name="jobType" value={jobType} handleChange={handleInput} list={jobTypeOptions} />
                    {/*<div className="form-row">*/}
                    {/*    <label className="form-label" htmlFor="jobType">job type</label>*/}
                    {/*    <select name="jobType" value={jobType} onChange={handleInput} className="form-select">*/}
                    {/*        {jobTypeOptions.map((item , index) => {*/}
                    {/*            return(*/}
                    {/*                <option key={index} value={item}>{item}</option>*/}
                    {/*            )*/}
                    {/*        })}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <div className="btn-container">
                        <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit} disabled={isLoading}>
                            submit
                        </button>
                        <button className="btn btn-block clear-btn" onClick={(e) => {
                            e.preventDefault()
                            clearValues()
                        }}>clear</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJobs;
