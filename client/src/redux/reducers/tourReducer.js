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

    case ActionTypes.REMOVE_FROM_CART:
      const ncopy = [...state.carts];
      const ncurItemIndex = ncopy.findIndex(
        (i) => i.payload._id === payload._id
      );
      const ncurItem = { ...ncopy[ncurItemIndex] };
      ncurItem.quantity--;
      if (ncurItem.quantity <= 0) {
        ncopy.splice(ncurItemIndex, 1);
      } else {
        ncopy[ncurItemIndex] = ncurItem;
      }
      return { ...state, carts: ncopy };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        carts: [],
      };

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
