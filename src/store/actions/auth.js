import * as actionTypes from './actionTypes'
import axios from '../../axiosAuth'

//Used for a Spinner while getting the response
export const startSignin = () => {
    return {
        type: actionTypes.START_SIGNIN
    }
}

export const signinSuccess = (authData) => {
    return {
        type: actionTypes.SUCCESS_SIGNIN,
        authData: authData
    }
}

export const signinFail = (error) => {
    return {
        type: actionTypes.FAIL_SIGNIN,
        error: error
    }
}

//This action creator does the Async Code
export const signin = (email, password) => {
    return dispatch => {
        dispatch(startSignin());
        const signinData = {
            email:email,
            password:password
        }
        axios.post('signin',signinData)
        .then(response => {
            //console.log(response)
            dispatch(signinSuccess(response.data))
        })
        .catch(err => {
            //console.log(err)
            dispatch(signinFail(err))
        })
    }
}
