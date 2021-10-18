import { combineReducers } from "redux";
import { ToggleReducer,InputReducer } from "../Reducers/index";

const rootReducer = combineReducers({
  Getmark:ToggleReducer,
  Getinput:InputReducer
});

export default rootReducer;