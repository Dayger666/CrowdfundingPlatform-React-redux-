import authReducer, {setIsRegister} from "./Auth-reducer";
import {authAPI, companyAPI} from "../api/api";

const SET_IMAGES_URLS = 'SET-IMAGES-URLS';
const SET_COMPANIES = 'SET-COMPANIES';


let initialState = {
    imagesUrls: [],
    isAuth: false,
    email: null,
    userName: null,
    _id: null,
    companyID: null,
    companies: [],
};
const CompanyInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES:
            return {
                ...state,
                companies:[...action.data],
            };

        default:
            return state;
    }

};
export let setCompanies=(companies)=>{
    return {
        type:SET_COMPANIES,
        data:companies,
    }
};
export let addingCompanyThunkCreator = (userID, name, description, category, location, images, youTubeLink, donateGoal, duration) => {
    return (dispatch) => {
        companyAPI.addCompany(userID, name, description, category, location, images, youTubeLink, donateGoal, duration).then((res) => {
            console.log(res);
        })
    }
};
export let getCompaniesThunkCreator=(pageSize,pageNumber)=>{
    return (dispatch)=>{
        companyAPI.getCompanies().then((res) => {
            dispatch(setCompanies(res.data));
            // dispatch(setIsFetching(false));
            // dispatch(setTotalUsersCount(res.totalCount>100?100:res.totalCount));
        })
    }

};
export default CompanyInfoReducer;