import {
  CLEAR_APPOINTMENT_DATA,
  UPDATE_SELECTED_BARBER,
  UPDATE_SELECTED_DATE,
  UPDATE_SELECTED_SALON,
  UPDATE_SELECTED_TIME,
  UPDATE_SELECTED_TREATMENT,
} from './../types';

export const updateSelectedSalon = (data: any) => ({
  type: UPDATE_SELECTED_SALON,
  payload: data,
});

export const updateSelectedTreatment = (data: any) => ({
  type: UPDATE_SELECTED_TREATMENT,
  payload: data,
});

export const updateSelectedBarber = (data: any) => ({
  type: UPDATE_SELECTED_BARBER,
  payload: data,
});

export const updateSelectedDate = (data: any) => ({
  type: UPDATE_SELECTED_DATE,
  payload: data,
});

export const updateSelectedTime = (data: any) => ({
  type: UPDATE_SELECTED_TIME,
  payload: data,
});

export const clearAppointmentData = () => ({
  type: CLEAR_APPOINTMENT_DATA,
});
