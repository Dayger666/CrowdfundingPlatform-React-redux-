import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware  from "redux-thunk";
import authReducer from "./Auth-reducer";
import CompanyInfoReducer from "./CompanyInfo-reducer";

let reducers=combineReducers({
    auth:authReducer,
    companyInfo:CompanyInfoReducer,
    form:formReducer,
});
let store=createStore(reducers,applyMiddleware(thunkMiddleware));


export default store;