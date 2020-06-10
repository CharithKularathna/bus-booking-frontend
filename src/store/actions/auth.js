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


//Helper Function
const setTokens = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('userID', data.userID)
    localStorage.setItem('email', data.email)
    localStorage.setItem('name', data.name)
}

//Helper Function
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

export const authStateSetFromLocal = () => {
    return dispatch => {
        let token = localStorage.getItem('token')
        if (token === null){
            dispatch(logout())
        }
        else {
            const authData = {
                token: token,
                role: localStorage.getItem('role'),
                userID: localStorage.getItem('userID'),
                email: localStorage.getItem('email'),
                name: localStorage.getItem('name')
                
            }
            dispatch(signinSuccess(authData))
        }
    }
}

export const startSignup = () => {
    return {
        type: actionTypes.START_SIGNUP
    }
}

export const signupSuccess = (message) => {
    return {
        type: actionTypes.SUCCESS_SIGNUP,
        message: message
    }
}

export const signupFail = (error) => {
    return {
        type: actionTypes.FAIL_SIGNUP,
        error: error
    }
}

export const signup = (formData) => {
    return dispatch => {
        dispatch(startSignup())
        axios.post('signup',formData)
        .then(response => {
            //console.log(response)
            const message = response.message
            dispatch(signupSuccess(message))
        })
        .catch(err => {
            const error = err.message
            console.log(error)
            dispatch(signupFail(error))
        })
    }
}

export const storeTurn = (turnID,startStation,endStation) => {
    return {
        type: actionTypes.STORE_TURN,
        turnID: turnID,
        startStation: startStation,
        endStation: endStation
    }
}

export const proceedToPay = (price,seats) => {
    return {
        type: actionTypes.PROCEED_TO_PAY,
        totalPrice: price,
        selectedSeats: seats
    }
}