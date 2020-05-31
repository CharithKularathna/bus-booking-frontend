import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import MaterialTable from "material-table";
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CancelIcon from '@material-ui/icons/Cancel';
import  { connect } from 'react-redux'
import axiosInstance from '../../axiosAuth'

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
    state = {
        root:{
            accepting: false,
            rejecting: false,
            adminID:this.props.uid,
            token:this.props.token,
            requests: null,
        },
        user:{
            id:null,
            name:null,
            phoneNumber:null,
            address:null,
            date:null,
        }
    }

    componentDidMount () {
        axiosInstance.get( 'newrequests/' + this.props.uid, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }})
            .then( response => {
                console.log(response)
            } )
            .catch( error => {
                console.log('error')
                console.log(error)
            } );
    }

    render(){
        const {classes} = this.props
        console.log(this.props.uid)
        console.log(this.props.token)
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
                            { title: 'Date', field: 'date', type: 'date' }
                        ]}
                        data={[
                            {name:"Kamal" ,address: "Colombo" ,mobileNumber:'0718989678',date:'2020-05-20'},
                            {name:"Perera" ,address: "Galle",mobileNumber:'0774567894',date:'2020-05-31'}
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

const mapStateToProps = (state) => {
    return{
        uid: state.signin.userID,
        token: state.signin.token
    }
}

export default connect(mapStateToProps)(withStyles(styles)(RequestPage));