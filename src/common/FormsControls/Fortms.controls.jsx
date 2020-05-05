import React from "react";
import classes from './FormsControls.module.css';

export const Textarea=({input,meta,...props})=>{
    const hasError=meta.touched&&meta.error;
    return(
        <div className={classes.formControl +" "+classes.error}>

            <div>
                <input {...input}{...props}/>
            </div>
            <span className={classes.errorMsg}>
               {hasError}
            </span>
        </div>
    )

}