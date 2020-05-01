import React, {useState} from 'react';
import classes from './CreateProjectPage.module.css';
import {Field, formValueSelector, reduxForm} from "redux-form";
import {ReduxFormSelect} from "./custom/ReduxFormSelect ";
import Carousel from "react-bootstrap/Carousel";
import {Util} from "cloudinary-core";
import cloud from '../../assets/images/cloud.png'
import youtube from '../../assets/images/youtube.png'
import ModalWindowReduxForm from "./custom/ModalWindow";
import grayBack from '../../assets/images/GrayBackground.jpg'
import {connect} from "react-redux";

const CreateProjectPage = (props) => {
    console.log(props.hasLocationValue);
    const [images, setImages] = useState([]);
    const [videoId, setVideoId] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = (value = '') => {
        setVideoId(value);
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const openUploadWidget = (options, callback) => {
        const scOptions = Util.withSnakeCaseKeys(options);
        window.cloudinary.openUploadWidget(scOptions, callback);
    };
    const beginUpload = tag => {
        const uploadOptions = {
            cloudName: "dayger666",
            tags: [tag, 'anImage'],
            uploadPreset: "m9gsgq1v",
            resource_type: 'image',
            sources: ['local', 'url'],
        };
        //bug with upload more and cant delete img
        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                if (photos.event === 'queues-end') {
                    for (let url of photos.info.files) {
                        setImages([...images, ...photos.info.files]);

                    }
                }
            } else {
                console.log(error);
            }
        })
    };

    const categoryOptions = [
        {value: 'Arts', label: 'Arts',},
        {value: 'Comics or illustration', label: 'Comics or illustration',},
        {value: 'Design', label: 'Design',},
        {value: 'Film', label: 'Film',},
        {value: 'Games', label: 'Games',},
        {value: 'Music', label: 'Music',},
    ];
    const locationOptions = [
        {value: 'Minsk', label: 'Minsk',},
        {value: 'Moscow', label: 'Moscow',},
        {value: 'SaintPetersburg', label: 'Saint Petersburg',},
        {value: 'Kiev', label: 'Kiev',},
        {value: 'Riga', label: 'Riga',},
        {value: 'Vilnius', label: 'Vilnius',},
        {value: 'Warsaw', label: 'Warsaw',},
        {value: 'London', label: 'London',},
        {value: 'Berlin', label: 'Berlin',},
    ];
    const imagesElements = images.map((currentValue, index, array) =>
        <Carousel.Item key={currentValue.public_id}>
            <img
                className={classes.image}
                src={`https://res.cloudinary.com/dayger666/image/upload/${currentValue.uploadInfo.path}`}
                alt="images"
            />
            <Carousel.Caption>
                {/*<p className={classes.slideP}>{index === 1 ? "Main image" : ""}</p>*/}
            </Carousel.Caption>
        </Carousel.Item>
    );
    return (
        <>
            <form className={classes.createProjectForm} onSubmit={props.handleSubmit((values) => {
                // console.log(values);
                props.onSubmit('adsasdasd', values);
            })}>
                <div className={classes.generalInformation}>
                    <div className={classes.nameInputField}><h3>Project name</h3>
                        <Field className={classes.field}
                               placeholder='Enter the project name' name={'name'}
                               component={'input'}/></div>
                    <div className={classes.descriptionInputField}><h3>Project description</h3>
                        <Field className={classes.field}
                               placeholder='Add a description of your project' name={'description'}
                               component={'input'}/></div>
                    <div className={classes.categoryField}><h3>Project category</h3>
                        <Field className={classes.field} name="category"
                               component={ReduxFormSelect} options={categoryOptions}>
                        </Field></div>
                    <div className={classes.locationInputField}><h3>Project location</h3>
                        <Field className={classes.field}
                               name="location"
                               component={ReduxFormSelect}
                               options={locationOptions}>
                        </Field></div>
                    <div className={classes.coverAndVideo}><h3>Project cover and video</h3>
                        <div className={classes.imageForProject}>
                            <div className={classes.imageWrapper}>
                                {imagesElements.length === 0 ?
                                    <img className={classes.cloud} alt={'qwe'} src={cloud}/> :
                                    <Carousel>{imagesElements}</Carousel>}
                            </div>
                            <button type='button' onClick={() => beginUpload("image")} className={classes.uploadButton}>
                                Add Image
                            </button>
                        </div>
                        <div className={classes.videoWrapper}>
                            <div><img alt={'asd'}
                                      src={videoId !== '' ? `//img.youtube.com/vi/${videoId}/0.jpg` : youtube}/></div>
                            <div>
                                <button type='button' className={classes.videoBtn} onClick={handleShow}>Add Video
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.budgetAndDuration}>
                        <h3>Budget and duration</h3>
                        <div className={classes.budgetAndDurationWrapper}>
                            <Field className={classes.fieldBudget}
                                   placeholder='Enter amount' name={'budget'}
                                   component={'input'}/>
                            <span className={classes.inputPostfix}>USD</span>
                            <Field className={classes.fieldDuration}
                                   placeholder='Days' name={'duration'}
                                   component={'input'}/>
                            <span className={classes.durationText}>From 1 to 180 days</span>
                        </div>
                    </div>
                </div>
                <div className={classes.buttonAndPreview}>
                    <button type='submit' className={classes.submitBtn}>Save</button>
                    <div className={classes.preview}>
                        <img className={classes.previewImg} alt={'qwe'}
                             src={imagesElements.length === 0 ? grayBack : `https://res.cloudinary.com/dayger666/image/upload/${images[0].uploadInfo.path}`}/>
                        <div className={classes.previewWrapper}>
                            <h3>
                                {typeof props.hasNameValue === 'undefined' ? 'Name of your project' : props.hasNameValue}
                            </h3>
                            <div className={classes.previewDescription}>
                                {typeof props.hasDescriptionValue === 'undefined' ? 'Description of your project' : props.hasDescriptionValue}
                            </div>
                            <div className={classes.mainInfo}>
                                {`${props.userName} / `}{typeof props.hasCategoryValue === 'undefined' ? 'Category / ' : `${props.hasCategoryValue.value} / `}{typeof props.hasLocationValue === 'undefined' ? 'Location / ' : props.hasLocationValue.value}
                            </div>
                            <progress className={classes.progress} value="0" max="">
                            </progress>
                            <div className={classes.moneyStatus}>
                                <div className={classes.money}>
                                    <div className={classes.status}>0 USD</div>
                                    <div className={classes.addition}>COLLECTED (0%)</div>
                                </div>
                                <div className={classes.days}>
                                    <div className={classes.status}> {typeof props.hasDaysValue === 'undefined' ? '0 days' : props.hasDaysValue}</div>
                                    <div className={classes.addition}>LEFT</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
            <ModalWindowReduxForm show={show} handleClose={handleClose}/>
        </>
    )
};
let CreateProjectReduxForm = reduxForm({
    form: 'createProject'
})(CreateProjectPage);
const selector = formValueSelector('createProject');
let CreateProjectReduxFormWithSelectors = connect(state => {
    // can select values individually
    const hasNameValue = selector(state, 'name');
    const hasDescriptionValue = selector(state, 'description');
    const hasCategoryValue = selector(state, 'category');
    const hasLocationValue = selector(state, 'location');
    const hasDaysValue = selector(state, 'duration');
    return {
        hasNameValue,
        hasDescriptionValue,
        hasCategoryValue,
        hasLocationValue,
        hasDaysValue,
    }
})(CreateProjectReduxForm)
export default CreateProjectReduxFormWithSelectors;