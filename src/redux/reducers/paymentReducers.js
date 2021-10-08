import {
  CREATE_PAYMENT,
  GET_PAYMENT,
  PAYMENT_LOADED,
  PAYMENT_LOADING,
} from '../types';

const initialState = {
  name: '',
  loading: false,
  transaction_history: [],
};

function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_LOADED:
      return {
        ...state,
        loading: false,
      };

    case GET_PAYMENT:
      return state;
    case CREATE_PAYMENT:
      return {
        ...state,
        loading: false,
        transaction_history: [...state.transaction_history, action.payload],
      };
    default:
      return state;
  }
}

export default paymentReducer;
