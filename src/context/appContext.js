import React, {useState, useReducer, useContext, useEffect} from 'react'
import App from "../App";
import axios from 'axios'

import reducer from "./reducer";
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDTAE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOB_BEGIN, GET_JOB_SUCCESS, SET_EDIT_JOB
} from "./actions";
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText : "",
    alertType  : "",
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation : userLocation || "",
    jobLocation : userLocation || "",
    showSideBar : false,
    isEditing : false,
    editJobId : "",
    position : "",
    company : "",
    jobTypeOptions : ["full-time","part-time","remote", "internship"],
    jobType : "full-time",
    statusOptions: ["pending","decline" , "interview"],
    status: "pending",
    jobs : [],
    totalJobs : 0,
    numberOfPages : 1,
    page : 1
}



const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`
    const authFetch = axios.create({
        baseURL : "http://localhost:9000/api/v1"
    })

    authFetch.interceptors.request.use((config) => {
        config.headers.common["Authorization"] = `Bearer ${state.token}`
        return config
    }, (err) => {
        return Promise.reject(err)
    })

    authFetch.interceptors.response.use((res) => {
        return res
    }, (err) => {
        console.log(err)
        if(err.response.status == 401){
            logoutUser()
        }
        return Promise.reject(err)
    })
    const displayAlert = () => {
        clearAlert()
        dispatch({type: DISPLAY_ALERT})

    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 3000)
    }

    const addUserToLocalStorage = ({user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)

    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {
        dispatch({type:REGISTER_USER_BEGIN})
        try{
            const res = await axios.post("http://localhost:9000/api/v1/auth/register", currentUser)
            const data = res.data
            const {user, token, location} = data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload : {user, token, location}
            })
            addUserToLocalStorage({user, token, location})
        }catch (e) {
            console.log(e)
            dispatch({type: REGISTER_USER_ERROR,payload: e.message})

        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN})
        try {
            const {data} = await axios.post("http://localhost:9000/api/v1/auth/login", currentUser)
            const {user, token, location}  = data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload : {user, token, location}
            })
            addUserToLocalStorage({user, token, location})

        }catch (e) {
            dispatch({
                type : LOGIN_USER_ERROR,
                payload: e.message
            })
        }
        clearAlert()
    }

    const toggleSidebar = () =>{
        dispatch({type: TOGGLE_SIDEBAR})
    }

    const logoutUser = () => {
        console.log("log out clicked")
        dispatch({type: LOGOUT_USER})
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch("/auth/updateUser", currentUser)
            const {user, location , token} = data
            dispatch({
                type: UPDTAE_USER_SUCCESS,
                payload : {user, location, token}
            })
            addUserToLocalStorage({user,location, token})

        }catch (e) {
            if(e.response.status != 401){
                dispatch({
                    type:UPDATE_USER_ERROR,
                    payload : e.message
                })
            }


        }
        clearAlert()
    }

    const handleChange = ({name, value}) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload : {name, value}

        })
    }

    const clearValues = () => {
        dispatch({type: CLEAR_VALUES})
    }

    const createJob = async () => {
        dispatch({type : CREATE_JOB_BEGIN})
        try{
            const {position, company, jobLocation, jobType, status} = state
            await authFetch.post('/jobs', {
                position,company, jobLocation, jobType, status
            })
            dispatch({
                type: CREATE_JOB_SUCCESS
            })
            dispatch({
                type: CLEAR_VALUES
            })

        }catch (e) {
            if(e.response.status == 401){
                return
            }
            dispatch({
                type: CREATE_JOB_ERROR,
                payload : e.message
            })
        }
        clearAlert()
    }

    const getJobs = async () => {
        const url = "http://localhost:9000/api/v1/jobs"
        dispatch({type:GET_JOB_BEGIN})
        try{
            const {data} = await authFetch(url)
            const {jobs, totalJobs, numberOfPages} = data
            dispatch({
                type : GET_JOB_SUCCESS,
                payload : {
                    jobs,
                    totalJobs,
                    numberOfPages
                }
            })
        }catch (e) {
            console.log(e)
        }
        clearAlert()
    }

    // useEffect(() => {
    //     getJobs()
    // },[])

    const setEditJob = (id) => {
        dispatch({
            type:SET_EDIT_JOB,
            payload : {id}
        })
        console.log(id)
    }

    const deleteJob = (id) => {
        console.log("deleting job id :" + id)
    }

    return(
        <AppContext.Provider value={{...state, displayAlert, clearAlert, registerUser, loginUser, logoutUser,
            toggleSidebar,updateUser, handleChange, clearValues, createJob, getJobs, setEditJob, deleteJob}}>
            {children}
        </AppContext.Provider>
    )



}
const useAppContext = () => {
    return useContext(AppContext)
}



export {AppProvider, initialState, useAppContext}





