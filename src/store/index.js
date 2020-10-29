import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/combinedReducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
