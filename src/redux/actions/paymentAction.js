import { CREATE_PAYMENT, GET_PAYMENT } from '../types';

export const getPayment = () => (dispatch) => {
  dispatch({
    type: GET_PAYMENT,
  });
};
export const createPayment = (data) => (dispatch) => {
  dispatch({
    type: CREATE_PAYMENT,
    payload: data,
  });
};
