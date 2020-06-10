import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    turnID: null,
    busType: null,
    bookedSeats: null,
    price: null
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_TURN:
            return updateObject(state,{turnID:action.turnID})
        default: return state;
    }
};

export default reducer;