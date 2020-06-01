import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    dialog:{

    },
    noButton:{
        color: 'red'
    }
}))

const confirmDialog = props => {
    const classes = useStyles();
    return(
        <div>
            <Dialog
                open={props.clicked}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='default' className={classes.noButton} >
                        No
                    </Button>
                    <Button onClick={props.handleConfirm} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
} 

export default confirmDialog;