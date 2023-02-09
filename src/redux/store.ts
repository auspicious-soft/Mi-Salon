import {createStore, combineReducers} from 'redux';
import createAppointmentReducer from './create_appointment/create_appointement.reducer';
import uiReducer from './ui/ui.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  userState: userReducer,
  createAppointmentState: createAppointmentReducer,
  uiState: uiReducer,
});
const store = () => {
  return createStore(rootReducer);
};

export default store;
