import * as ActionTypes from "../types/action-types";

export const setToursToStore = (tours) => {
  return {
    type: ActionTypes.SET_TOURS_TO_STORE,
    payload: tours,
  };
};

export const selectedTour = (tour) => {
  return {
    type: ActionTypes.SELECTED_TOUR,
    payload: tour,
  };
};

export const removeSelectedTour = (tour) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_TOUR,
  };
};
