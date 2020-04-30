import React, {useState} from 'react';
import classes from './CreateProjectPage.module.css';
import {NavLink} from "react-router-dom";
import {DropdownButton, Dropdown} from 'react-bootstrap';
import Select from 'react-select';
import mainBanner from '../../assets/images/crowdfundingBanner6.png'
import {Field, reduxForm} from "redux-form";

const CreateProjectPage = (props) => {

    return (
        <form className={classes.createProjectForm} onSubmit={props.handleSubmit}>
            <div className={classes.generalInformation}>
                <div className={classes.nameInputField}><h3>Project name</h3>
                    <Field className={classes.field}
                           placeholder='Enter the project name' name={'name'}
                           component={'input'}/></div>
                <div className={classes.descriptionInputField}>><h3>Project description</h3>
                    <Field className={classes.field}
                           placeholder='Add a description of your project' name={'name'}
                           component={'input'}/></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes.buttonAndPreview}>
                <div>ds</div>
                <div></div>
            </div>
        </form>
    )
};
let CreateProjectReduxForm = reduxForm({
    form: 'createProject'
})(CreateProjectPage);
export default CreateProjectReduxForm;