import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
        marginBottom: '8px'
    }
}))

const input = ( props ) => {
    const classes = useStyles()
    const isError = props.invalid && props.shouldValidate && props.touched
    return (
       <TextField 
            className={classes.input}
            label={props.label}
            value={props.value}
            onChange={props.changed}
            error={isError}
            helperText={isError ? props.errorMsg : null}
            type={props.elementConfig.type}
        />
    )

};

export default input;