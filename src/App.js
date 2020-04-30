import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import classes from './App.module.css';
import HeaderContainer from './components/Header/HeaderContainer'
import MainPageContainer from './components/MainPage/MainPageContainer'
import SignUpContainer from './components/Users/Sign up/SignUp'
import LoginContainer from './components/Users/Log in/Login'
import CreateProjectPageContainer from './components/CreateProjectPage/CreateProjectPageContainer'
import {compose} from "redux";
import {connect} from "react-redux";
import  { useState, useEffect } from 'react';
import {  initializeApp } from "././redux/Auth-reducer";

let App=(props)=>{

  useEffect(() => {
    props.initializeApp();
  
  },[]);
  return (
    <div className={classes.appWrapper}>
      
      <HeaderContainer/>
      <div className={classes.content}>
        <Route path='/projects' render={()=><MainPageContainer/>}/>
        <Route path='/createProject' render={()=><CreateProjectPageContainer/>}/>
        <Route path='/signup' render={() => <SignUpContainer/>}/>
        <Route path='/login' render={() => <LoginContainer/>}/>
      </div>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return{
    isAuth: state.auth.isAuth,
  }
};
export default compose(withRouter,connect(mapStateToProps,{initializeApp
}))(App);