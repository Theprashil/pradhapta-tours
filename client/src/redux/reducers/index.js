import { combineReducers } from "redux";
import { tourReducer, selectedTourReducer } from "./tourReducer";
const rootReducer = combineReducers({
  allTours: tourReducer,
  tour: selectedTourReducer,
});

export default rootReducer;
