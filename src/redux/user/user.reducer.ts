import {
  UPDATE_FORGOT_PASSWORD_EMAIL,
  UPDATE_USER_DETAILS,
  UPDATE_USER_IS_LOGGED_IN,
  UPDATE_USER_LOCATION,
} from '../types';

const intialState = {
  user: {},
  isLoggedIn: false,
  forgotPasswordEmail: '',
  location: {},
};

const userReducer = (state = intialState, {type, payload}: any) => {
  switch (type) {
    case UPDATE_USER_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: payload,
      };
    case UPDATE_FORGOT_PASSWORD_EMAIL:
      return {
        ...state,
        forgotPasswordEmail: payload,
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_USER_LOCATION:
      return {
        ...state,
        location: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
