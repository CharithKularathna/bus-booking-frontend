import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles (theme => ({
    root:{
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    },
    
}))

const alert = (props) => {
    /*
    const bClasses = ['alert']
    if (props.type == "Success"){
        bClasses.push("alert-success")
    }
    if (props.type == "Danger"){
        bClasses.push("alert-danger")
    }
    */
    const classes = useStyles()
    let type = null
    if (props.type == "Success"){
        type = "success"
    }
    else {
        type = "error"
    }
    return(
        <div className={classes.root}>
            <Alert severity={type}>
                <AlertTitle>{props.title}</AlertTitle>
                {props.children}
            </Alert>
        </div>
    )
}

export default alert;