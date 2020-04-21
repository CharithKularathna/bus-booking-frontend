import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    message:null,
    error:null,
    loading:false
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.START_SIGNUP:
            return updateObject(state,{
                loading:true
            })
        case actionTypes.SUCCESS_SIGNUP:
            return updateObject(state,{
                loading:false,
                message:action.message,
                error:null
            })
        case actionTypes.FAIL_SIGNUP:
            return updateObject(state,{
                loading:false,
                error:action.error,
                message:null
            })
        default: return state;
    }

}

export default reducer;