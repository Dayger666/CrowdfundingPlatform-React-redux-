import React, { useState } from 'react';
import Header from './Header'
import { connect } from "react-redux";
import {logOutThunkCreator} from "../../redux/Auth-reducer"

let HeaderContainer = (props) => {

    const logOut=()=>{
        props.logOutThunkCreator();
    }

    return <Header isAuth={props.isAuth.isAuth} userName={props.userName} logOut={logOut}/>
}


let mapStateToProps=(state)=>{
    return{
        isAuth: state.auth.isAuth,
        userName:state.auth.userName,
    }
};
export default connect(mapStateToProps,{logOutThunkCreator})(HeaderContainer);