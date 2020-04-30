import React from "react";
import { Field, reduxForm } from "redux-form";
import classes from './Login.module.css';
import googleIcon from '../../../assets/images/google.png'
import facebookIcon from '../../../assets/images/facebook.png'
import FacebookLogin from 'react-facebook-login';

let LoginForm = (props) => {
    return (
        <div className={classes.LoginForm}>
            <form className={classes.form} onSubmit={props.handleSubmit}>
                <h3>Log In</h3>
                <div>
                    <Field className={classes.field} placeholder='Email' name={'email'} component={'input'} />
                </div>
                <div>
                    <Field className={classes.field} placeholder='Password' name={'password'} component={'input'} type={'password'} />
                </div>
                <div>
                    {/* <Field type='checkbox' name={'rememberMe'} component={'input'} />Remember me */}
        </div>
                <div>
                    <button className={classes.sendBtn}>
                        Login
                    </button>
                </div>
                <div className={classes.separate}>

                </div>
                </form>
                <div>
                    <button onClick={()=>{props.signInGoogle()}} className={classes.googleBtn}>
                        Log in with Google
                        <img alt='231' src={googleIcon}/>
                    </button>
                </div>
                <FacebookLogin
    appId="417240015664074"
    autoLoad={false}
    fields="name,email,picture"
    callback={props.responseFacebook}
    cssClass={classes.facebookBtn}
    textButton={<span> Log in with Facebook
        <img alt='231' src={facebookIcon}/></span>}
  />,
        
        </div>)
};

let LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);
export default LoginReduxForm;