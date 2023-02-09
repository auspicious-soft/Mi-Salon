import {
  CLEAR_APPOINTMENT_DATA,
  UPDATE_SELECTED_BARBER,
  UPDATE_SELECTED_DATE,
  UPDATE_SELECTED_SALON,
  UPDATE_SELECTED_TIME,
  UPDATE_SELECTED_TREATMENT,
} from '../types';

const intialState = {
  selectedSalon: {},
  selectedTreatment: {},
  selectedBarber: {},
  selectedDate: null,
  selectedTime: {},
};

const createAppointmentReducer = (
  state = intialState,
  {type, payload}: any,
) => {
  switch (type) {
    case UPDATE_SELECTED_SALON:
      return {
        ...state,
        selectedSalon: payload,
      };
    case UPDATE_SELECTED_TREATMENT:
      return {
        ...state,
        selectedTreatment: payload,
      };
    case UPDATE_SELECTED_BARBER:
      return {
        ...state,
        selectedBarber: payload,
      };
    case UPDATE_SELECTED_DATE:
      return {
        ...state,
        selectedDate: payload,
      };
    case UPDATE_SELECTED_TIME:
      return {
        ...state,
        selectedTime: payload,
      };
    case CLEAR_APPOINTMENT_DATA:
      return {
        ...state,
        selectedSalon: {},
        selectedTreatment: {},
        selectedBarber: {},
        selectedDate: null,
        selectedTime: {},
      };
    default:
      return state;
  }
};

export default createAppointmentReducer;
