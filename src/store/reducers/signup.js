import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    message:null,
    loading:false
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        default: return state;
    }

}

export default reducer;