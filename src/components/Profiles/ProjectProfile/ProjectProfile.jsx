import React, {useEffect, useState} from "react";
import classes from './ProjectProfile.module.css';
import YouTube from "react-youtube";
import {Button, ButtonGroup} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ReactStars from "react-rating-stars-component";
import DonateModalWindow from "./custom/DonateModalWindow";
import {Field, reduxForm} from "redux-form";
import Post from "./Post/Post";
import {NavLink} from "react-router-dom";


const ProjectProfile = (props) => {
    let rating = props.profile.rating || [];
    let [showVideo, setShowVideo] = useState(true);
    let [showComments, setShowComments] = useState(true);

    const getRating = () => {
        for (let i = rating.length - 1; i >= 0; i--) {
            if (+rating[i].idUser === props.userID) {

                return rating[i].personalRating
            }
        }
        return 0;
    };
    let imagesElements = [];
    if (props.profile.images) {
        imagesElements = props.profile.images.map((currentValue, index, array) =>
            <Carousel.Item key={index}>
                <img
                    className={classes.image}
                    src={currentValue===undefined?'https://image.freepik.com/free-vector/404_8024-4.jpg':`https://res.cloudinary.com/dayger666/image/upload/${currentValue}`}
                    alt="images"
                />
            </Carousel.Item>
        );
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDonate = (donate) => {
        setOpen(false);
        props.donate(donate);
    };
    const handleClose = () => {
        setOpen(false);
    };
let commentsElements=[];
if(props.profile.comments) {
    commentsElements = props.profile.comments.map((commentData) => <Post key={commentData._id}
                                                                         message={commentData.text}
                                                                         id={commentData.idUser}
                                                                         authorID={props.profile.userID}
                                                                         date={commentData.date}
                                                                         userName={commentData.userName}
                                                                         userImg={commentData.userImg}/>);
}
    return (
        <div className={classes.profile}>
            <DonateModalWindow handleDonate={handleDonate} open={open} handleClose={handleClose}/>
            <h1>{props.profile.name}</h1>
            <div className={classes.projectBody}>
                <div className={classes.aboutProject}>
                    <ButtonGroup className={classes.buttonGroup} aria-label="Basic example">
                        <Button variant="secondary" active={showVideo} onClick={() => {
                            setShowVideo(true)
                        }}>Video</Button>
                        <Button variant="secondary" onClick={() => {
                            setShowVideo(false)
                        }}>Images</Button>
                    </ButtonGroup>
                    {showVideo ?
                        <YouTube videoId={props.profile.youTubeLink} opts={{
                            height: '365',
                            width: '630',
                            playerVars: {
                                autoplay: 0,
                            },
                        }}/> : <Carousel>{imagesElements}</Carousel>
                    }
                    <div className={classes.bodyInfo}>
                        <p>{props.profile.description}</p>
                        <div className={classes.projectInfoFooter}>
                            <div className={classes.projectAuthor}>
                                <strong className={classes.authorName}>{props.profile.userName}</strong>
                                <div className={classes.authorText}>Project author</div>
                            </div>
                            <div className={classes.additionalInfo}>
                                <div className={classes.addition}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13">
                                        <path fill="currentColor" fill-rule="evenodd"
                                              d="M7.04 11c0 .55-.3.68-.7.3L3.52 8.42.7 11.3c-.4.38-.7.24-.7-.3V1c0-.55.44-1 1-1h5.03c.56 0 1 .46 1 1v10z"/>
                                    </svg>
                                    {props.profile.category}
                                </div>
                                <div className={classes.addition}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="12" viewBox="0 0 9 12">
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M0 4.2C0 7.35 4.24 12 4.24 12s4.23-4.65 4.23-7.8c0-2.32-1.9-4.2-4.23-4.2C1.9 0 0 1.88 0 4.2zm4.24 1.5c-.84 0-1.52-.67-1.52-1.5s.68-1.5 1.52-1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                                    </svg>
                                    {props.profile.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.donateInfo}>
                    <div className={classes.stats}>
                        {/*<div className={classes.statsItem}>*/}
                        {/*    <strong>0</strong>*/}
                        {/*    <div className={classes.itemCaption}>sponsors</div>*/}
                        {/*</div>*/}
                        <div className={classes.statsItem}>
                        <span className={classes.statsItemSum}>
                            <strong className={classes.sum}>{props.profile.currentSum}</strong>
                            <span className={classes.currency}> USD</span>
                            <sup
                                className={classes.percentage}>{Math.ceil((props.profile.currentSum * 100) / props.profile.donateGoal)}%</sup>
                        </span>
                            <div className={classes.itemCaption}>DONATE GOAL {props.profile.donateGoal} USD</div>
                        </div>
                        <div className={classes.statsItem}>
                            <strong>{props.profile.duration - Math.ceil(Math.abs((Date.now() - props.profile.beginningDate) / (1000 * 60 * 60)))}</strong>
                            <div className={classes.itemCaption}>DAYS LEFT</div>
                        </div>
                        <ReactStars
                            size={30}
                            half={false}
                            onChange={props.changeRating}
                            value={getRating()}
                            count={10}
                            color2={'#27aae1'}
                        />
                        <button className={classes.donateBtn} onClick={handleClickOpen}>If you want to support us click
                            here
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.projectFooter}>
                <div className={classes.projectFooterNav}><ButtonGroup className={classes.buttonGroup}
                                                                       aria-label="Basic example">
                    <Button variant="info" active={showComments} onClick={() => {
                        setShowComments(true)
                    }}>Comments</Button>
                    <Button variant="info" onClick={() => {
                        setShowComments(false)
                    }}>About the project</Button>
                </ButtonGroup>
                </div>
                <div className={classes.commentsForm}>
                    {showComments ?
                        <div>
                            {props.userName?
                                <form onSubmit={props.handleSubmit((values) => {
                                    props.reset();
                                    props.onSubmit(values);
                                })} className={classes.textAreaForm}>
                                    <Field component={'textarea'} name={"newCommentText"}
                                           placeholder={`Write something here...`} rows="3"
                                           className={classes.textArea}/>
                                    <div className={classes.sendBtnWrapper}>
                                        <button className={classes.sendCommentBtn}>add post</button>
                                    </div>
                                </form>:<div className={classes.commentMessage}>
                                    Only authorized  users can post comments.<NavLink to={'/login'}><strong>Log in</strong></NavLink>
                                </div>
                            }
                    <div className={classes.footerContent}>
                        {commentsElements.reverse()}
                    </div>
                        </div>: 'asdasd'}
                </div>
            </div>
        </div>
    );
};


export default reduxForm({
    form: 'donate'
})(ProjectProfile);