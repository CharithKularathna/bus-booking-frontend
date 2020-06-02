import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { TextField, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialog:{

    },
    noButton:{
        color: 'red'
    },
    leftInputs:{
        marginLeft: '7%',
        marginTop: '10px'
    },
    rightInputs:{
        marginTop: '10px',
        marginLeft: '15%',
    },
    title:{
        textAlign:'center'
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
                <DialogTitle id="alert-dialog-title" className={classes.title}>{props.title}</DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField 
                        className={classes.leftInputs}
                        label="User ID"
                        type="text"
                        value= {props.data.id}
                        onChange={(event)=>props.formChanged(event,'id')}
                    />
                    <TextField 
                        className={classes.rightInputs}
                        label="First Name"
                        type="text"
                        value= {props.data.firstName}
                        onChange={(event)=>props.formChanged(event,'firstName')}
                    />
                    <TextField 
                        className={classes.leftInputs}
                        label="Second Name"
                        type="text"
                        value= {props.data.secondName}
                        onChange={(event)=>props.formChanged(event,'secondName')}
                    />
                    <TextField 
                        className={classes.rightInputs}
                        label="E-mail Address"
                        type="email"
                        value= {props.data.email}
                        onChange={(event)=>props.formChanged(event,'email')}
                    />
                    <TextField 
                        className={classes.leftInputs}
                        label="Phone Number"
                        type="text"
                        value= {props.data.phoneNumber}
                        onChange={(event)=>props.formChanged(event,'phoneNumber')}
                    />
                    <TextField 
                        className={classes.rightInputs}
                        label="Address"
                        type="text"
                        value= {props.data.address}
                        onChange={(event)=>props.formChanged(event,'address')}
                    />
                    <TextField 
                        className={classes.leftInputs}
                        label="NIC Number"
                        type="text"
                        value= {props.data.nic}
                        onChange={(event)=>props.formChanged(event,'nic')}
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