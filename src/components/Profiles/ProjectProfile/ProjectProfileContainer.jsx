import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import ProjectProfile from "./ProjectProfile";
import {
    saveDonateThunkCreator,
    saveRatingThunkCreator,
    setProjectProfileThunkCreator
} from "../../../redux/ProjectProfile-reducer";
import {withRouter} from "react-router-dom";
import {addingCommentThunkCreator} from "../../../redux/ProjectProfile-reducer";


let ProjectProfileContainer = (props) => {
    useEffect(() => {
        let projectID = props.match.params.projectID;
        props.setProjectProfileThunkCreator(projectID);
    }, []);
let img='https://images.genius.com/859261be9ed37f8168e056a27cebfacf.1000x563x1.jpg';
    let changeRating = (newRating) => {
        props.saveRatingThunkCreator(props.projectProfile.projectID, props.projectProfile.userID, newRating)
    };
    let donate = (donate) => {
        props.saveDonateThunkCreator(props.projectProfile.projectID, Number(donate) + (+props.projectProfile.currentSum));
    };
    let onSubmit=(form)=>{
props.addingCommentThunkCreator(props.projectProfile.projectID,props.userID,img,props.userName,form.newCommentText);
    };
    console.log(props.projectProfile);
    return <ProjectProfile profile={props.projectProfile} changeRating={changeRating} userID={props.userID}
                           onSubmit={onSubmit} donate={donate} isAuth={props.isAuth} userName={props.userName}/>

};

let mapStateToProps = (state) => {
    return {
        projectProfile: state.projectProfile.profile,
        userID: state.auth.userID,
        isAuth: state.auth.isAuth,
        userName:state.auth.userName,
    }
};

export default compose(connect(mapStateToProps, {
    setProjectProfileThunkCreator, saveRatingThunkCreator, saveDonateThunkCreator,addingCommentThunkCreator
}), withRouter)(ProjectProfileContainer)