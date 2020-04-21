import React from 'react'
import Alert from '../Alert/Alert'
import classes from './Success.css'

const success = (props) => (
    <div className={classes.Success}>
        <Alert type="Success">props.msg</Alert>
    </div>
)

export default success;
