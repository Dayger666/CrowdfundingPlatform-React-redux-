import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Field, formValueSelector, reduxForm} from "redux-form";
import classes from './DonateModalWindow.module.css';
import ReactPlayer from "react-player";
import YouTube from "react-youtube";
import money from '../../../../assets/images/money.png'
import closeBtn from '../../../../assets/images/closeBtn.png'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

let DonateModalWindow = (props) => {
    let [amount,setAmount]=useState('');
    const changeAmount=(event)=>{
        if(event.target.value!=='e') {
            setAmount(event.target.value);
        }
    };

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <div style={{display: 'flex', justifyContent: 'space-between',}}>
                    <h3 style={{paddingLeft:'20px',paddingTop:'10px'}} >Donation</h3>
                    <img style={{width: '8%',paddingRight:'0px',cursor:'pointer'}} alt={'qwe'} src={closeBtn} onClick={props.handleClose}/>
                </div>
                <DialogContent>
                    <DialogContentText>
                        <img alt={'qwe'} src={money} style={{width: '100%'}}/>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="$"
                        type="number"
                        fullWidth
                        onChange={changeAmount}
                        value={amount}
                    />
                </DialogContent>
                <DialogActions>
                    <Button style={{width: '100%', background: '#27aae1'}} onClick={()=>{
                        setAmount('');
                        props.handleDonate(amount);}} color="primary">
                        Donate
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DonateModalWindow;
