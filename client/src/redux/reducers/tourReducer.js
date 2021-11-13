import { ActionTypes } from "../types/action-types";

const initialState = {
  carts: [],
};

export const tourReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TOURS:
      return state;
    default:
      return state;
  }
};
