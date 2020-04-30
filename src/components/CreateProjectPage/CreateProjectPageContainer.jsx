import React, { useState } from 'react';
import CreateProjectPage from './CreateProjectPage'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

let CreateProjectPageContainer = (props) => {
    if (!props.userName) {
        return <Redirect to={'/login'} />
      }
    const onSubmit = (formData) => {

    };
    return <CreateProjectPage  onSubmit={onSubmit}/>
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
    }
};

export default connect(mapStateToProps, {})(CreateProjectPageContainer);
