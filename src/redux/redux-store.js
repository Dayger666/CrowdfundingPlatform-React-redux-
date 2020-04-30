import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware  from "redux-thunk";
import authReducer from "./Auth-reducer";

let reducers=combineReducers({
    auth:authReducer,
    form:formReducer,
});
let store=createStore(reducers,applyMiddleware(thunkMiddleware));


export default store;