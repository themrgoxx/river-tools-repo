import { combineReducers } from "redux";
import { UserReducer,InputReducer } from "../Reducers/index";

const rootReducer = combineReducers({
  UserReducer,
  Getinput:InputReducer
});

export default rootReducer;