// reducers.js
import { combineReducers } from 'redux';
import counterReducer from './counter/counter-reducer'; // Import your counterReducer here
import AuthReducer from './counter/AuthReducer'; // Import your counterReducer here

const rootReducer = combineReducers({
  counter: counterReducer, // You can give it any key you like
  auth:AuthReducer
  // Add other reducers if needed
});

export default rootReducer;