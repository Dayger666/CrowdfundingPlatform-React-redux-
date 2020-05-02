import React, {useState} from 'react';
import SignUpReduxForm from "./SignUpForm";
import {connect} from "react-redux";
import {registerThunkCreator, setIsRegister} from "../../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";


let SignUp = (props) => {

    const onSubmit = (formData) => {
        props.registerThunkCreator(formData.name, formData.email, formData.password);
    };
    if (props.isRegister) {
        props.setIsRegister(false);
        return <Redirect to={'/login'}/>
    }
    return (
        <div>
            <SignUpReduxForm onSubmit={onSubmit}/>
        </div>)

};
let mapStateToProps = (state) => {
    return {
        isRegister: state.auth.isRegister,
    }
};
export default connect(mapStateToProps, {registerThunkCreator, setIsRegister})(SignUp);
