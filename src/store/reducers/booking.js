import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    turnID: null,
    busType: null,
    bookedSeats: null,
    price: null,
    startStation:'',
    endStation:''
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_TURN:
            return updateObject(state,{turnID:action.turnID, startStation:action.startStation, endStation:action.endStation})
        case actionTypes.PROCEED_TO_PAY:
            return updateObject(state,{price:action.totalPrice, bookedSeats:action.selectedSeats})
        default: return state;
    }
};

export default reducer;