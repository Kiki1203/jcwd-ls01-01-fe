import { combineReducers } from 'redux';

// Import Reducer
import {userReducer} from './userReducer';
import {adminReducer} from "./adminReducer";

const allReducer = combineReducers({
    user: userReducer,
    adminReducer,
})

export default allReducer;
