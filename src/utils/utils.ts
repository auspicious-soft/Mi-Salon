import {first, get, isArray, isEmpty, size} from 'lodash';
import moment from 'moment';

export const getMessageFromError = (errors: any, key: string) => {
  if (!isEmpty(errors)) {
    return first(errors[key]);
  } else {
    return null;
  }
};

export const convertTo12Hr = (time: string) => {
  return moment(time, 'HH:mm:ss').format('h:mm A');
};

export const add30MinutesToTime = (time: string) => {
  return moment(time, 'HH:mm:ss').add(30, 'minutes').format('h:mm A');
};

// create a function to get random index from an array

export const getRandomIndex = (array: any[]) => {
  if (isArray(array)) {
    return Math.floor(Math.random() * array.length);
  } else {
    return 0;
  }
};

// function to calculate distance between two longitude and latitude in miles
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  if (!lat2 && !lon2) {
    return 0;
  }
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  // const dInMiles = convertKmToMiles(d);
  return parseFloat(d.toFixed(2));
};

// degree to radius
export const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

// creat a function to conver number in to 2 decimal places
export const convertTo2Decimal = (num: number) => {
  return parseFloat(num.toFixed(2));
};

// convert km into miles
export const convertKmToMiles = (km: number) => {
  return parseFloat((km * 0.621371).toFixed(2));
};

// function to concat array of number into a string with comma
export const concatNumber = (array: number[]) => {
  if (size(array) > 0) {
    return array.join(',');
  } else {
    return '';
  }
};
