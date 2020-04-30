import React from 'react';
import LoginReduxForm from "./LoginForm";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {loginThunkCreator, oauthGoogleThunkCreator, oauthFacebookThunkCreator} from "../../../redux/Auth-reducer";
import {useState, useEffect} from 'react';

let Login = (props) => {
    useEffect(() => {
        const _onInit = auth2 => {
            console.log('init OK', auth2)
        };
        const _onError = err => {
            console.log('error', err)
        }
        window.gapi.load('auth2', function () {
            window.gapi.auth2
                .init({ // не забудьте указать ваш ключ в .env
                    client_id:
                        "16073129096-de3gpdq3igf2hghcmbbans5votkof1lv.apps.googleusercontent.com",
                })
                .then(_onInit, _onError)
        })

    }, []);
    const onSubmit = (formData) => {
        props.loginThunkCreator(formData.email, formData.password);
    };
    const signInGoogle = () => {

        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signIn().then(googleUser => {

            // метод возвращает объект пользователя
            // где есть все необходимые нам поля
            const profile = googleUser.getBasicProfile()
            console.log('ID: ' + profile.getId()) // не посылайте подобную информацию напрямую, на ваш сервер!
            console.log('Full Name: ' + profile.getName())
            console.log('Given Name: ' + profile.getGivenName())
            console.log('Family Name: ' + profile.getFamilyName())
            console.log('Image URL: ' + profile.getImageUrl())
            console.log('Email: ' + profile.getEmail())

            // токен
            console.log(googleUser.tc.access_token)
            props.oauthGoogleThunkCreator(googleUser.tc.access_token)
        })
    }
    const responseFacebook = (response) => {
        props.oauthFacebookThunkCreator(response.accessToken);
    }
    if (props.userName) {
        return <Redirect to={'/projects'}/>
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit} signInGoogle={signInGoogle} responseFacebook={responseFacebook}/>
        </div>)

};
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
    }
};
export default connect(mapStateToProps, {
    loginThunkCreator,
    oauthGoogleThunkCreator,
    oauthFacebookThunkCreator
})(Login);
