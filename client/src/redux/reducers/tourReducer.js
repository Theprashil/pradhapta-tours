import * as ActionTypes from "../types/action-types";

const initialState = {
  tours: [],
  carts: [],
};

export const tourReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TOURS_TO_STORE:
      return { ...state, tours: payload };
    default:
      return state;
  }
};

export const selectedTourReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_TOUR:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_TOUR:
      return {};
    default:
      return state;
  }
};
