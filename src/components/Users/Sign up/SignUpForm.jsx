import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from './SignUp.module.css';
import googleIcon from '../../../assets/images/google.png'
import facebookIcon from '../../../assets/images/facebook.png'

let SignUpForm = (props) => {
    return (
        <div className={classes.SignUpForm}>
            <form className={classes.form} onSubmit={props.handleSubmit}>
                <h3>Sign Up</h3>
                <div>
                    <Field className={classes.field} placeholder='Name' name={'name'} component={'input'}/>
                </div>
                <div>
                    <Field className={classes.field} placeholder='Email' name={'email'} component={'input'}/>
                </div>
                <div>
                    <Field className={classes.field} placeholder='Password' name={'password'} component={'input'}
                           type={'password'}/>
                </div>
                <div>
                    <button className={classes.sendBtn}>
                        Create account
                    </button>
                </div>
                <div className={classes.separate}>

                </div>
            </form>
            <div>
                <button className={classes.googleBtn}>
                    Sign Up with Google
                    <img alt='231' src={googleIcon}/>
                </button>
            </div>
            <div>
                <button className={classes.facebookBtn}>
                    Sign Up with Facebook
                    <img alt='231' src={facebookIcon}/>
                </button>
            </div>


        </div>)
};

export default  reduxForm({
    form: 'signup'
})(SignUpForm);
