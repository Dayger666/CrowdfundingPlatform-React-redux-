import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Field, formValueSelector, reduxForm} from "redux-form";
import classes from './ModalWindow.module.css';
import ReactPlayer from "react-player";
import YouTube from "react-youtube";

let ModalWindowReduxForm = (props) => {
    const [videoId, setVideoId] = useState('');
    const handleChange = (event) => {

        setVideoId(event.target.value);
    };
//Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('http://localhost:4200').

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Video about the project</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.modalBody}><input className={classes.field}
                                                                 placeholder='Enter the youtube link' value={videoId}
                                                                 onChange={handleChange}
                />
                    <button className={classes.addVideoBtn} onClick={() => {
                        props.handleClose(videoId.split('v=')[1])
                    }}>ADD
                    </button>
                </Modal.Body>
                {videoId !== "" ? <Modal.Footer className={classes.modalFooter}>
                    <YouTube videoId={videoId.split('v=')[1]} opts={{
                        height: '360',
                        width: '640',
                        playerVars: {
                            // https://developers.google.com/youtube/player_parameters
                            autoplay: 0,
                        },
                    }}/>;
                </Modal.Footer> : null
                }
            </Modal>
        </>
    );
};

export default ModalWindowReduxForm;
