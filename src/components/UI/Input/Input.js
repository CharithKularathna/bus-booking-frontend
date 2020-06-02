import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
        marginBottom: '10px'
    },
    input: {
        color: theme.palette.secondary.light
    }
}))

const input = ( props ) => {
    const classes = useStyles()
    const isError = props.invalid && props.shouldValidate && props.touched
    return (
       <TextField 
            className={classes.textField}
            label={props.label}
            value={props.value}
            onChange={props.changed}
            error={isError}
            helperText={isError ? props.errorMsg : null}
            type={props.elementConfig.type}
            variant='outlined'
            size='small'
            InputLabelProps={{
                className: classes.input
            }}
            InputProps={{
                className: classes.input
            }}

        />
    )

};

export default input;