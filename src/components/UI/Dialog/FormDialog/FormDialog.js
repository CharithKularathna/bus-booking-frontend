import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialog:{

    },
    noButton:{
        color: 'red'
    }
}))

const formDialog = props => {
    const classes = useStyles()
    return(
        <Dialog
                open={props.clicked}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <TextField 
                        label="User ID"
                        type="text"
                        value= {props.data.id}
                    />
                    <TextField 
                        label="Name"
                        type="text"
                        value= {props.data.name}
                    />
                    
                    <TextField 
                        label="E-mail Address"
                        type="email"
                    />
                    <TextField 
                        label="Phone Number"
                        type="text"
                        value= {props.data.phoneNumber}
                    />
                    <TextField 
                        label="Address"
                        type="text"
                        value= {props.data.address}
                    />
                    <TextField 
                        label="NIC Number"
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='default' className={classes.noButton} >
                        Cancel
                    </Button>
                    <Button onClick={props.handleSubmit} color="primary" autoFocus>
                        Submit
                    </Button>
                </DialogActions>
        </Dialog>
    )
} 

export default formDialog;