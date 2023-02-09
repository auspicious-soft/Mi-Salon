import {
  UPDATE_FORGOT_PASSWORD_EMAIL,
  UPDATE_USER_DETAILS,
  UPDATE_USER_IS_LOGGED_IN,
  UPDATE_USER_LOCATION,
} from '../types';

export const udpateIsUserLoggedIn = (value: boolean) => ({
  type: UPDATE_USER_IS_LOGGED_IN,
  payload: value,
});

export const updateForgotPasswordEmail = (value: string) => ({
  type: UPDATE_FORGOT_PASSWORD_EMAIL,
  payload: value,
});

export const updateUserDetails = (value: any) => ({
  type: UPDATE_USER_DETAILS,
  payload: value,
});

export const updateUserLocation = (value: any) => ({
  type: UPDATE_USER_LOCATION,
  payload: value,
});
