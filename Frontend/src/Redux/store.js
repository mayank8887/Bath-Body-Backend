
import { legacy_createStore,combineReducers,applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import ProductReducer from "./products/reducer";

const rootReducer=combineReducers({ecommerceData:ProductReducer})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));