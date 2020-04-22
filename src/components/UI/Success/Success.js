import React from 'react'
import Alert from '../Alert/Alert'
import classes from './Success.css'
import { Link } from 'react-router-dom'

const success = (props) => (
    <div className={classes.Success}>
        <Alert type="Success">Registration Successful. Check your Email for the Activation Link</Alert>
    </div>
)

export default success;
