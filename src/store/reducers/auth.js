import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    token: null,
    userID: null,
    role:null,
    name:null,
    email:null,
    loading:false,
    error: null
};

const signinSuccess = (state, action) => {
    return updateObject(state,
        {
            token: action.authData.token,
            role: action.authData.role,
            error:null,
            loading:false,
            userID: action.authData.userID,
            email: action.authData.email,
            name: action.authData.name
        })
}

const signinFail = (state,action) => {
    return updateObject(state,{
        error:action.error.message,
        loading:false
    })
}

const logout = (state,action) => {
    return updateObject(state,{
        token: null,
        userID: null,
        role:null,
        name:null,
        email:null,
        loading:false,
        error: null
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.START_SIGNIN:
            return updateObject(state,{loading:true, error:null})
        case actionTypes.SUCCESS_SIGNIN:
            return signinSuccess(state,action)
        case actionTypes.FAIL_SIGNIN:
            return signinFail(state,action)
        case actionTypes.LOGOUT:
            return logout(state,action)
        default: return state;
    }
};

export default reducer;