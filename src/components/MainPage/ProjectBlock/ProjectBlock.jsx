import classes from "./ProjectBlock.module.css";
import {NavLink} from "react-router-dom";
import React from "react";


let ProjectBlock=(props)=>{
    console.log(props.images===undefined);
    return (
        <div className={classes.buttonAndPreview}>
            <div className={classes.preview}>
                <img className={classes.previewImg} alt={'qwe'}
                     src={props.images===undefined?'https://image.freepik.com/free-vector/404_8024-4.jpg':`https://res.cloudinary.com/dayger666/image/upload/${props.images}`}/>
                <div className={classes.previewWrapper}>
                    <NavLink to={`/project/${props.projectID || props.companyID}`}>
                        <h3>
                            {props.name}
                        </h3>
                    </NavLink>
                    <div className={classes.previewDescription}>
                        {props.description}
                    </div>
                    <div className={classes.mainInfo}>
                        {`${props.userName} / `}{`${props.category} / `}{props.location}
                    </div>
                    <progress className={classes.progress} value={props.currentSum} max={props.donateGoal}>
                    </progress>
                    <div className={classes.moneyStatus}>
                        <div className={classes.money}>
                            <div className={classes.status}>{props.currentSum} USD</div>
                            <div className={classes.addition}>COLLECTED
                                ({Math.ceil((props.currentSum * 100) / props.donateGoal)}%)
                            </div>
                        </div>
                        <div className={classes.days}>
                            <div
                                className={classes.status}> {props.duration - Math.ceil(Math.abs((Date.now() - props.beginningDate) / (1000 * 60 * 60)))} Days
                            </div>
                            <div className={classes.addition}>LEFT</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};
export default ProjectBlock;