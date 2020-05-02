import React, { useState } from 'react';
import CreateProjectPage from './CreateProjectPage'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {addingCompanyThunkCreator} from "../../redux/CompanyInfo-reducer";

let CreateProjectPageContainer = (props) => {
    if (!props.userName) {
        return <Redirect to={'/login'} />
      }
    const onSubmit = (images,videoId, values) => {
        let imagesPath=images.map((value)=>{
            return value.uploadInfo.path;
        });
        console.log(props.userID);
        props.addingCompanyThunkCreator(props.userID,values.name,values.description,values.category.value,values.location.value,imagesPath,videoId,values.donateGoal,values.duration);
    };
    return <CreateProjectPage  userName={props.userName} onSubmit={onSubmit}  imagesUrls={props.imagesUrls}/>
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
        imagesUrls: state.companyInfo.imagesUrls,
        userID:state.auth.userID,
    }
};

export default connect(mapStateToProps, {addingCompanyThunkCreator})(CreateProjectPageContainer);
