import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    saveDonateThunkCreator,
    saveRatingThunkCreator,
    setProjectProfileThunkCreator
} from "../../../redux/ProjectProfile-reducer";
import {withRouter} from "react-router-dom";
import {addingCommentThunkCreator} from "../../../redux/ProjectProfile-reducer";
import UserProfile from "./UserProfile";
import {
    getProjectsByUserIdThunkCreator,
    removeProjectByCompanyIdThunkCreator
} from "../../../redux/ProjectInfo-reducer";
import {initializeApp} from "../../../redux/Auth-reducer";


let UserProfileContainer = (props) => {
    useEffect(() => {
        props.getProjectsByUserIdThunkCreator(props.userID);
    }, []);

    let onRemove=(projectID)=>{
         props.removeProjectByCompanyIdThunkCreator(projectID);
        props.getProjectsByUserIdThunkCreator(props.userID);
    };
    return <UserProfile projects={props.projects} onRemove={onRemove}/>

};

let mapStateToProps = (state) => {
    return {
        projects: state.projectInfo.projects,
        userID: state.auth.userID,
        isAuth: state.auth.isAuth,
        userName:state.auth.userName,
    }
};

export default compose(connect(mapStateToProps, {
    removeProjectByCompanyIdThunkCreator,getProjectsByUserIdThunkCreator, saveRatingThunkCreator, saveDonateThunkCreator,addingCommentThunkCreator
}), withRouter)(UserProfileContainer)