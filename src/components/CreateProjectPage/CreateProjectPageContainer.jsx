import React, { useState } from 'react';
import CreateProjectPage from './CreateProjectPage'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {setImagesUrls} from "../../redux/CompanyInfo-reducer";

let CreateProjectPageContainer = (props) => {
    if (!props.userName) {
        return <Redirect to={'/login'} />
      }
    const onSubmit = (formData,values) => {
        console.log(formData);
        console.log(values);
    };
    return <CreateProjectPage  userName={props.userName} onSubmit={onSubmit} setImagesUrls={setImagesUrls} imagesUrls={props.imagesUrls}/>
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
        imagesUrls: state.companyInfo.imagesUrls,
    }
};

export default connect(mapStateToProps, {setImagesUrls})(CreateProjectPageContainer);
