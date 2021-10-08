import { combineReducers } from 'redux';
import paymentReducer from './paymentReducers';

const rootReducer = combineReducers({
  payments: paymentReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
