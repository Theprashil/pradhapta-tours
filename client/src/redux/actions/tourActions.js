import { ActionTypes } from "./types/actionTypes";

export const addTours = (tours) => {
  return {
    type: ActionTypes.ADD_TOURS,
    payload: tours,
  };
};

export const selectedTour = (tourID) => {
  return {
    type: ActionTypes.SELECTED_TOUR,
    payload: tourID,
  };
};
