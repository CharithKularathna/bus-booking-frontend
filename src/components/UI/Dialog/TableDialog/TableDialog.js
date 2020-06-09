import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import MaterialTable from 'material-table'

const useStyles = makeStyles(theme => ({
    root: {

    },
    title:{

    }
}))

const tableDialog = (props) => {
    const classes = useStyles()
    return(
        <Dialog
                open={props.clicked}
                onClose={props.handleClose}
                fullWidth={props.fullWidth}
                maxWidth='lg'
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title" className={classes.title}>{props.title}</DialogTitle>
                <Divider />
                <DialogContent>
                    <MaterialTable 
                        style={{overflowY: 'scroll', maxHeight: '90vh'}}
                        title={props.title}
                        columns={props.columns ? props.columns : []}
                        data={props.tabledata}
                    />
                </DialogContent>
        </Dialog>
    )
}

export default tableDialog
