import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware  from "redux-thunk";
import authReducer from "./Auth-reducer";
import ProjectInfoReducer from "./ProjectInfo-reducer";
import ProjectProfileReducer from "./ProjectProfile-reducer";

let reducers=combineReducers({
    auth:authReducer,
    projectInfo:ProjectInfoReducer,
    projectProfile:ProjectProfileReducer,
    form:formReducer,
});
let store=createStore(reducers,applyMiddleware(thunkMiddleware));


export default store;