import {UPDATE_SELECTED_TAB} from '../types';

export const updateSelectedTab = (selectedTab: string) => {
  return {
    type: UPDATE_SELECTED_TAB,
    payload: selectedTab,
  };
};
