import authReducer, {setIsRegister} from "./Auth-reducer";
import {authAPI, companyAPI} from "../api/api";

const SET_IMAGES_URLS = 'SET-IMAGES-URLS';
const SET_PROJECTS = 'SET-PROJECTS';


let initialState = {
    imagesUrls: [],
    isAuth: false,
    email: null,
    userName: null,
    _id: null,
    companyID: null,
    projects: [],
};
const CompanyInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECTS:
            return {
                ...state,
                projects:[...action.data],
            };

        default:
            return state;
    }

};
export let setProjects=(companies)=>{
    return {
        type:SET_PROJECTS,
        data:companies,
    }
};

export let addingProjectThunkCreator = (userID,userName, name, description, category, location, images, youTubeLink, donateGoal, duration) => {
    return (dispatch) => {
        companyAPI.addCompany(userID,userName, name, description, category, location, images, youTubeLink, donateGoal, duration).then((res) => {
            console.log(res);
        })
    }
};
export let getProjectsThunkCreator=(pageSize,pageNumber)=>{
    return (dispatch)=>{
        companyAPI.getCompanies().then((res) => {
            dispatch(setProjects(res.data));
            // dispatch(setIsFetching(false));
            // dispatch(setTotalUsersCount(res.totalCount>100?100:res.totalCount));
        })
    }
};

export let getProjectsByCategoryThunkCreator=(projectCategory)=>{
    return (dispatch)=>{
        companyAPI.getProjectByCategory(projectCategory).then((res) => {
             dispatch(setProjects(res.data));
        })
    }
};
export let getProjectsByUserIdThunkCreator=(userID)=>{
    return (dispatch)=>{
        companyAPI.getProjectsByUserId(userID).then((res) => {
            console.log(res.data);
             dispatch(setProjects(res.data));
        })
    }
};

export let removeProjectByCompanyIdThunkCreator=(companyID)=>{
    return (dispatch)=>{
        companyAPI.removeProjectById(companyID).then((res) => {
            console.log(res.data);
            // dispatch(setProjects(res.data));
        })
    }
};
export default CompanyInfoReducer;