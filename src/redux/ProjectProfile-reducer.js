import {companyAPI} from "../api/api";
import {setProjects} from "./ProjectInfo-reducer";

const SET_PROJECT_PROFILE= 'SET-PROJECT-PROFILE';

let initialState = {

    profile: {},
};
const ProjectProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT_PROFILE:
            return {
                ...state,
                profile:action.data,
            };

        default:
            return state;
    }

};
export let setProjectProfile=(ProjectProfile)=>{
    return {
        type:SET_PROJECT_PROFILE,
        data:ProjectProfile,
    }
};
export let setProjectProfileThunkCreator=(projectID)=>{
    return (dispatch)=>{
        companyAPI.getCompanyProfile(projectID).then((res)=>{
            dispatch(setProjectProfile(res.data));
        })
    }
};
export let saveRatingThunkCreator=(companyID,userID,rating)=>{
    return (dispatch)=>{
        companyAPI.saveRating(companyID,userID,rating).then((res)=>{
           console.log(res);
        })
    }
};
export let saveDonateThunkCreator=(companyID,currentSum)=>{
    return (dispatch)=>{
        companyAPI.donate(companyID,currentSum).then((res)=>{
          dispatch(setProjectProfileThunkCreator(JSON.parse(res.config.data).projectID));
        })
    }
};

export let addingCommentThunkCreator=(projectID,userID,img,userName,commentText)=>{
    return (dispatch)=>{
        companyAPI.saveComment(projectID,userID,img,userName,commentText).then((res) => {
            console.log(res);
            dispatch(setProjectProfileThunkCreator(JSON.parse(res.config.data).projectID));
        })
    }
};

export default ProjectProfileReducer;