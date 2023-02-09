import Config from 'react-native-config';

const apiUrl = Config.API_URL + '/api';

export const authenticationUrls = {
  signup: apiUrl + '/auth/signup',
  login: apiUrl + '/auth/login',
  forgotPassword: apiUrl + '/auth/forgot-password',
  verificationOtp: apiUrl + '/auth/varification-otp',
  user: apiUrl + '/user',
  saveFbDetails: apiUrl + '/facebook-detail',
  logout: apiUrl + '/logout',
  changePassword: apiUrl + '/auth/change-password',
  deleteAccount: apiUrl + '/delete',
};

export const homeApiUrls = {
  salonListByQuery: (query: string) => apiUrl + `/salon-list?query=${query}`,
  salonListByType: (types: string) => apiUrl + `/salons?query=${types}`,
  salonDetails: (salonId: number) => apiUrl + `/salon/${salonId}`,
  salonType: apiUrl + `/salon-type`,
  addFavouriteSalon: apiUrl + `/favourite`,
  listSalonBarber: (salonId: number, treatmentId: number) =>
    apiUrl + `/treatment-staff?salon_id=${salonId}&treatment_id=${treatmentId}`,
  createAppointment: apiUrl + `/appointment`,
  slotsAvailability: apiUrl + `/slot-booking`,
  addReview: apiUrl + `/review`,
};

export const settingsApiUrls = {
  updateProfile: apiUrl + '/edit-profile',
};

export const myAppointmentApiUrls = {
  listMyAppointments: (userId: number, query: string) =>
    apiUrl + `/appointments/${userId}?query=${query}`,
  cancelAppointment: (appointmentId: number) =>
    apiUrl + `/appointment-cancel/${appointmentId}`,
  appointmentDetails: (appointmentId: number) =>
    apiUrl + `/appointment-detail/${appointmentId}`,
};

export const getFavouriteSalons = (userId: number) =>
  apiUrl + `/favourites/${userId}`;
