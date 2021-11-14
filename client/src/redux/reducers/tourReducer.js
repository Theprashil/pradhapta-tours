import * as ActionTypes from "../types/action-types";

const initialState = {
  tours: [],
  carts: [],
};

export const tourReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TOURS_TO_STORE:
      return { ...state, tours: payload };
    case ActionTypes.ADD_TO_CART:
      const copy = [...state.carts];
      const curItemIndex = copy.findIndex((i) => i.payload._id === payload._id);
      if (curItemIndex < 0) {
        copy.push({ payload, quantity: 1 });
      } else {
        const copyItem = { ...copy[curItemIndex] };
        copyItem.quantity++;
        copy[curItemIndex] = copyItem;
      }

      return { ...state, carts: copy };
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
