import { combineReducers } from 'redux';

// Import Reducer
import { userReducer } from './userReducer';

const allReducer = combineReducers({
  userReducer,
});

export default allReducer;
