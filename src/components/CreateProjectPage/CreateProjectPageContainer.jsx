import React, { useState } from 'react';
import CreateProjectPage from './CreateProjectPage'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

let CreateProjectPageContainer = (props) => {
    if (!props.isAuth) {
        return <Redirect to={'/login'} />
      }

    return <CreateProjectPage />
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
    }
};

export default connect(mapStateToProps, {})(CreateProjectPageContainer);
