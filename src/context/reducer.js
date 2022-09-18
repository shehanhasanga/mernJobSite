import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDTAE_USER_SUCCESS,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR, GET_JOB_BEGIN, GET_JOB_SUCCESS, SET_EDIT_JOB
} from "./actions";
import {initialState} from "./appContext";



const reducer = (state, action) => {
    if(action.type == DISPLAY_ALERT){
        return {...state, showAlert : true , alertType : "danger", alertText : "Please provide all values"}
    }else if(action.type == CLEAR_ALERT){
        return {...state, showAlert: false , alertType : "", alertText : ""}
    }else if(action.type == REGISTER_USER_BEGIN){
        return {...state , isloading: true}
    } else if(action.type == REGISTER_USER_SUCCESS){
        return {...state, isloading: false, token : action.payload.token, user : action.payload.user, userLocation : action.payload.location
        , jobLocation: action.payload.location, showAlert: true, alertType: 'success',alertText: "User is created. Redirecting ...." }
    } else if(action.type == REGISTER_USER_ERROR){
        return {...state,
            isloading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload }
    }else if(action.type == LOGIN_USER_BEGIN){
        return {...state , isloading: true}
    } else if(action.type == LOGIN_USER_SUCCESS){
        return {...state, isloading: false, token : action.payload.token, user : action.payload.user, userLocation : action.payload.location
            , jobLocation: action.payload.location, showAlert: true, alertType: 'success',alertText: "Login success.." }
    } else if(action.type == LOGIN_USER_ERROR){
        return {...state,
            isloading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload }
    }else if(action.type == TOGGLE_SIDEBAR){
        return {...state, showSideBar: !state.showSideBar}
    } else if (action.type == LOGOUT_USER){
        return {...initialState, user: null, token: null, userLocation: "", jobLocation: ""}
    }else if(action.type == UPDATE_USER_BEGIN){
        return {...state , isloading: true}
    } else if(action.type == UPDTAE_USER_SUCCESS){
        return {...state, isloading: false, token : action.payload.token, user : action.payload.user, userLocation : action.payload.location
            , jobLocation: action.payload.location, showAlert: true, alertType: 'success',alertText: "Update user success.." }
    } else if(action.type == UPDATE_USER_ERROR){
        return {...state,
            isloading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload }
    } else if(action.type == HANDLE_CHANGE){
        return {
            ...state,
            [action.payload.name] : action.payload.value
        }
    }else if(action.type == CLEAR_VALUES){
        const initial = {
            isEditing : false,
            editJobId : "",
            jobLocation : state.userLocation || "",
            position : "",
            company : "",
            jobType : "full-time",
            status: "pending"
        }
        return {
            ...state,
            ...initial
        }
    }else if(action.type == CREATE_JOB_BEGIN){
        return {...state, isloading: true}
    }else if(action.type == CREATE_JOB_SUCCESS){
        return {
            ...state,
            isloading: false,
            showAlert: true,
            alertType: "success",
            alertText: "New job is created"
        }
    }else if(action.type == CREATE_JOB_ERROR){
        return {
            ...state,
            isloading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload
        }
    }else if(action.type == GET_JOB_BEGIN){
        return {
            ...state,
            isloading: true,
            showAlert: false
        }
    }else if(action.type == GET_JOB_SUCCESS){
        return {
            ...state,
            jobs : action.payload.jobs,
            totalJobs : action.payload.totalJobs,
            numberOfPages : action.payload.numberOfPages,
        }
    }else if(action.type == SET_EDIT_JOB){
        const job = state.jobs.find((job) => job._id == action.payload.id)
        const {_id, position , company, jobLocation, jobType, state} = job
        return(
            {...state, isEditing : true, editJobId: _id, position,company, jobLocation, jobType,state

            }
        )
    }
    throw new Error("no such action: " + action.type)
}

export default reducer
