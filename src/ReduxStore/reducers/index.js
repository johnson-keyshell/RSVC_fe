import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
// Add other reducers as needed

const rootReducer = combineReducers({
  socket: socketReducer,
  // Add other reducers as needed
});

export default rootReducer;
