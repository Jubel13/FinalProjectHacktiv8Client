import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";
import loggerMiddleware from "./middlewares/logger";
import inspectionReducer from "./reducers/inspectionReducer";
import carReducer from "./reducers/carReducer";
import exteriorReducer from "./reducers/exteriorReducer";

const rootReducer = combineReducers({
  userReducer,
  inspectionReducer,
  carReducer,
  exteriorReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));

export default store;
