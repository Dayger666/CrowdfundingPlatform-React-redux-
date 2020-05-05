import React, {useEffect, useState} from 'react';
import MainPage from './MainPage'
import {connect} from "react-redux";
import {
    getProjectsByCategoryThunkCreator,
    getProjectsThunkCreator,
} from "../../redux/ProjectInfo-reducer";

let MainPageContainer = (props) => {
    useEffect(() => {
        props.getProjectsThunkCreator();
    }, []);
    let getByCategory=(values)=>{
        console.log(values);
        props.getProjectsByCategoryThunkCreator(values);
    };
    return <MainPage projects={props.projects} getByCategory={getByCategory} getProjectsThunkCreator={props.getProjectsThunkCreator}/>
};


let mapStateToProps = (state) => {
    return {
        projects: state.projectInfo.projects,
    }
};
export default connect(mapStateToProps, {getProjectsThunkCreator,getProjectsByCategoryThunkCreator})(MainPageContainer);