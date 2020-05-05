import React, { useState } from 'react';
import CreateProjectPage from './CreateProjectPage'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {addingProjectThunkCreator} from "../../redux/ProjectInfo-reducer";

let CreateProjectPageContainer = (props) => {
    if (!props.userName) {
        return <Redirect to={'/login'} />
      }
    const onSubmit = (images,videoId, values) => {
        let imagesPath=images.map((value)=>{
            return value.uploadInfo.path;
        });
        props.addingProjectThunkCreator(props.userID,props.userName,values.name,values.description,values.category.value,values.location.value,imagesPath,videoId,values.donateGoal,values.duration);
       return <Redirect to={'/projects'} />
    };
    return <CreateProjectPage  userName={props.userName} onSubmit={onSubmit} />
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
        userID:state.auth.userID,
    }
};

export default connect(mapStateToProps, {addingProjectThunkCreator})(CreateProjectPageContainer);
