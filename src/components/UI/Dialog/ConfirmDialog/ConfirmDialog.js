import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dialog:{

    }
}))

const confirmDialog = props => {
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
                    <Button onClick={props.handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={props.handleConfirm} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
} 

export default confirmDialog;