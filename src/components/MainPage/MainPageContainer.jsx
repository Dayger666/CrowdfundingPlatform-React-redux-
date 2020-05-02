import React, {useEffect, useState} from 'react';
import MainPage from './MainPage'
import {connect} from "react-redux";
import {addingCompanyThunkCreator, getCompaniesThunkCreator, setImagesUrls} from "../../redux/CompanyInfo-reducer";

let MainPageContainer = (props) => {
    useEffect(() => {
        props.getCompaniesThunkCreator();
    }, []);
console.log(props.companies);
    return <MainPage />
};


let mapStateToProps = (state) => {
    return {
        companies: state.companyInfo.companies,
    }
};
export default connect(mapStateToProps, {getCompaniesThunkCreator})(MainPageContainer);