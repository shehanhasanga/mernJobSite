import {useContext, useEffect, useState} from "react";
import Wrapper from '../assets/wrappers/RegisterPage'
import {Logo, Formrow, Alert} from  '../components/index'
import {useAppContext} from "../context/appContext";
import {useNavigate} from "react-router-dom"
const initialState = {
    name:"",
    email : "",
    password: "",
    isMember : false
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    const navigate = useNavigate()
    const {user, isloading, showAlert,displayAlert,clearAlert , registerUser, loginUser} = useAppContext();
    useEffect(() => {
        if(user){
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
    }, [user, navigate])

    console.log(showAlert)
    const toggleMemvber = () => {
        setValues({...values, isMember: !values.isMember})
    }
    const handleState = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
        console.log(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password, isMember} = values
        if(!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const user = {name, email, password}
        if(isMember){
            console.log("Already a member")
            loginUser(user)
        } else {
            registerUser(user)
        }
        console.log(values)
    }
    return (
       <Wrapper className = "full-page">
            <form className='form' onSubmit={onSubmit}>
               <Logo/>
               <h3>{values.isMember? "Login" : "Register"}</h3>
                {showAlert && <Alert/>}
                {!values.isMember && <Formrow type="text" name="name" value={values.name} handleChange={handleState} />}
                <Formrow type="email" name="email" value={values.email} handleChange={handleState} />
                <Formrow type="password" name="password" value={values.password} handleChange={handleState} />
                <button type="submit" className="btn btn-block" disabled={isloading}>submit</button>
                <p>
                    {values.isMember ? "Not a member yet" : "Already a member?"}
                    <button type="button" onClick={toggleMemvber} className="member-btn">{ values.isMember? "Register" : "Login"}</button>
                </p>
            </form>
       </Wrapper>
    )
}
export default Register;
