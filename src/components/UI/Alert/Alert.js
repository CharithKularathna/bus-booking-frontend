import React from 'react'
import classes from './Alert.css'

const alert = (props) => {
    const bClasses = ['alert']
    if (props.type == "Success"){
        bClasses.push("alert-success")
    }
    if (props.type == "Danger"){
        bClasses.push("alert-danger")
    }
    return(
        <div className={bClasses.join(" ")}>
            {props.children}
        </div>
    )
}

export default alert;