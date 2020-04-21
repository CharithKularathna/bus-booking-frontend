import React from 'react'
import Alert from '../Alert/Alert'
import classes from './Success.css'

const success = (props) => (
    <div className={classes.Success}>
        <Alert type="Success">Register Successful. Check your Email for the Activation Link</Alert>
    </div>
)

export default success;
