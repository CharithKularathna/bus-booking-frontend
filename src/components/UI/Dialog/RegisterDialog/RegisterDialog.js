import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Input from '../../Input/Input'
import { stringCapitalize } from '../../../../store/utility';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {

    },
    title:{

    }
}))

const registerDialog = (props) => {
    console.log(props.formElementsArray)
    const inputs = props.formElementsArray.map(element => (
        <TextField
            key={element.id}
            value={element.value}
            onChange={(event) => props.inputChangeHandler(event, element.id)} 
            label={stringCapitalize(element.id)}
            type="text"
            style={{marginRight:'80px'}} />
    ))
    const classes = useStyles()
    return(
        <Dialog
                open={props.clicked}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title" className={classes.title}>{props.title}</DialogTitle>
                <Divider />
                <DialogContent>
                    {inputs}
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
export default registerDialog;