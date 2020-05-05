import React from 'react';
import classes from './Post.module.css';

const Post =(props)=>{
let isAuthor=props.id===props.authorID;
console.log(isAuthor);
    return (
        <div className={classes.item}>
                <img className={isAuthor?classes.authorAvatar:''} alt='12' src='https://images.genius.com/859261be9ed37f8168e056a27cebfacf.1000x563x1.jpg'/>
            <div className={classes.commentContent}>                <div>
                <div>
                    <strong>{props.userName}</strong>
                </div>
                <div className={classes.info}>
                    <span className={classes.commentInfo}>{isAuthor?'Project author / ':''}</span>
                    <time className={classes.commentDate}>{props.date}</time>
                </div>
                <div className={classes.commentTxt}>{props.message}</div>
            </div>
            <div>
            </div>
                </div>
        </div>
    );
};
export default Post;