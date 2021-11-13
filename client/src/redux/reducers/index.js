import { combineReducers } from "redux";
import { tourReducer } from "./tourReducer";
const rootReducer = combineReducers({
  allTours: tourReducer,
});

export default rootReducer;
