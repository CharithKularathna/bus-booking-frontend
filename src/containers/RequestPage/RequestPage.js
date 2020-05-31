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
import { secondsToDate } from '../../store/utility'


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
        accepting: false,
        rejecting: false,
        adminID:this.props.uid,
        token:this.props.token,
        error:null,
        requestArray: null,
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
                //console.log(response)
                this.setState({requestArray:response.data.newOwners})
            } )
            .catch( error => {
                console.log('error')
                console.log(error)
            } );
    }

    render(){
        const {classes} = this.props
        //console.log(this.props.uid)
        //console.log(this.props.token)
        console.log(this.state.requestArray)
        let tabledata = []
        if (this.state.requestArray !== null){
            tabledata = this.state.requestArray.map(entry => (
                {
                    userID:entry.id,
                    name:entry.name,
                    address:entry.address,
                    mobileNumber:entry.phoneNumber,
                    date: secondsToDate(entry.date._seconds*1000)
                }
            ))
        }
        
        return (
            <React.Fragment>
                <Paper className={classes.table}>
                    <MaterialTable
                        style={{overflowY: 'scroll', maxHeight: '90vh'}}
                        title="Bus Owner Requests"
                        columns={[
                            { title: 'User ID', field: 'userID' },
                            { title: 'Name', field: 'name' },
                            { title: 'Address', field: 'address' },
                            { title: 'Mobile Number', field: 'mobileNumber', type: 'numeric' },
                            { title: 'Date', field: 'date', type: 'date' }
                        ]}
                        data={tabledata}
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