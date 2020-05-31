import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import MaterialTable from "material-table";
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = theme => (
    {
    
        table:{
            marginTop: '25px',
            maxWidth: '100%',
            height: '419px',
            minWidth: '85%',
        }
    }
)

class RequestPage extends Component {
    render(){
        const {classes} = this.props
        return (
            <React.Fragment>
                <Paper className={classes.table}>
                    <MaterialTable
                        style={{overflowY: 'scroll', maxHeight: '90vh'}}
                        title="Bus Owner Requests"
                        columns={[
                            { title: 'Name', field: 'name' },
                            { title: 'Address', field: 'address' },
                            { title: 'Mobile Number', field: 'mobileNumber', type: 'numeric' },
                        ]}
                        data={[
                            {name:"Kamal" ,address: "Colombo" ,mobileNumber:'0718989678'},
                            {name:"Perera" ,address: "Galle",mobileNumber:'0774567894'}
                        ]}
                        actions={[
                            {
                                icon:()=><VerifiedUserIcon color='primary'/>,
                                tooltip: 'Accept Request'
                            },
                            {
                                icon:()=><CancelIcon color='error' />,
                                tooltip: 'Decline Request'
                            }

                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </Paper>
                
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(RequestPage);