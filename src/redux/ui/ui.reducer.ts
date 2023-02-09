import {UPDATE_SELECTED_TAB} from './../types';
import {} from '../types';

const intialState = {
  selectedTab: '',
};

const uiReducer = (state = intialState, {type, payload}: any) => {
  switch (type) {
    case UPDATE_SELECTED_TAB:
      return {
        ...state,
        selectedTab: payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
