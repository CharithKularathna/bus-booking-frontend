import * as actionTypes from './actionTypes'
import axios from '../../axiosAuth'

//Helpers to Store tokens at sign in
const mapAuthData = (responseObject) => {
    return {
        token: responseObject.token,
        role: responseObject.user.role,
        userID: responseObject.user.user.user.uid,
        email: responseObject.user.user.user.email,
        name: responseObject.user.user.user.displayName
    }
}



const setTokens = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('userID', data.userID)
    localStorage.setItem('email', data.email)
    localStorage.setItem('name', data.name)
}

const removeTokens = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userID')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
}

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
            const authData = mapAuthData(response.data)
            setTokens(authData)
            dispatch(signinSuccess(authData))
        })
        .catch(err => {
            //console.log(err)
            dispatch(signinFail(err))
        })
    }
}

export const logout = () => {
    removeTokens();
    return {
        type: actionTypes.LOGOUT
    }
}
