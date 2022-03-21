import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";
import loggerMiddleware from "./middlewares/logger";
import inspectionReducer from "./reducers/inspectionReducer";
import carReducer from "./reducers/carReducer";

const rootReducer = combineReducers({
  userReducer,
  inspectionReducer,
  carReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));

export default store;
