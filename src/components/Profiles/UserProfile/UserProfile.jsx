import React, {useEffect, useState} from "react";
import YouTube from "react-youtube";
import {Button, ButtonGroup} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ReactStars from "react-rating-stars-component";
import {Field, reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";
import classes from './UserProfile.module.css';
import ProjectBlock from "../../MainPage/ProjectBlock/ProjectBlock";
import img from "../../../assets/images/closeBtn.png"

const UserProfile = (props) => {
    console.log(props.projects);
    let project = props.projects.map((value) => {
        return (
            <div className={classes.blockWrapper}>
                <div className={classes.deleteImgWrapper}>
                <img className={classes.deleteImg} alt={'qwe'} src={img} onClick={()=>{props.onRemove(value.projectID)}}/>
                </div>
            <ProjectBlock projectID={value.projectID} images={value.images[0]} companyID={value.companyID}
                             name={value.name} description={value.description} userName={value.userName}
                             category={value.category} location={value.location} currentSum={value.currentSum}
                             donateGoal={value.donateGoal} duration={value.duration} beginningDate={value.beginningDate}/>
            </div>)

    });
    return (
        <div className={classes.userProfileWrapper}>
            <div>
        <h1> Here are your projects</h1>
            </div>
            <div className={classes.projectsWrapper}>
                {project}
            </div>
        </div>
    );
};

export default UserProfile