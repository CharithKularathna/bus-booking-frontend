import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import MaterialTable from "material-table";
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CancelIcon from '@material-ui/icons/Cancel';
import  { connect } from 'react-redux'
import axiosInstance from '../../../axiosAuth'
import { secondsToDate, updateObject, phoneNumberFormatter } from '../../../store/utility'
import ConfirmDialog from '../../../components/UI/Dialog/ConfirmDialog/ConfirmDialog'
import FormDialog from '../../../components/UI/Dialog/FormDialog/FormDialog'
import { Redirect } from 'react-router-dom'

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

class RequestBus extends Component {
    state = {
        accepting: false,
        rejecting: false,
        adminID:this.props.uid,
        token:this.props.token,
        error:null,
        requestArray: null,
        user:{
            busID:"",
            ownerID:"",
            reqid:"",
            windowSeatPrice:'',
            JumpingSeatPrice:'',
            NormalSeatPrice:'',
        }
    }

    componentDidMount () {
        this.fetchData()
    }

    fetchData = () => {
        axiosInstance.get( 'newbusrequests/' + this.props.uid, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }})
            .then( response => {
                //console.log(response)
                this.setState({requestArray:response.data.newBusRequests})
            } )
            .catch( error => {
                //console.log('error')
                //console.log(error)
            } );
    }

    resetState = () => {
        const newState = updateObject(this.state.user,{
            id:"",
            firstName:"",
            secondName:"",
            email:"",
            phoneNumber:"",
            address:"",
            nic:""
        })
        this.setState({rejecting:false,accepting:false,user:newState})
    }

    rejectNoHandler = () => {
        this.resetState()
    }

    rejectYesHandler = () => {
        console.log(this.state.user.busID)
        axiosInstance.put('rejectbus/' + this.props.uid,{
            busId:this.state.user.busID
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then( response => {
            //console.log(response)
            this.resetState()
            //console.log(this.state)
            //console.log(this.props)
            //this.props.history.push('/admin/dashboard/requests')
            this.fetchData()
            
        }).catch( error => {
            console.log(error.response)
            this.resetState()
            this.fetchData()
        })
    
        
    }
    acceptHandler = () => {
        console.log(this.state.user)
        /*
        axiosInstance.post('newbusrequests/' + this.props.uid,{
            ownerId:this.state.user.id,
            firstName:this.state.user.firstName,
            secondName:this.state.user.secondName,
            email:this.state.user.email,
            phoneNumber:phoneNumberFormatter(this.state.user.phoneNumber),
            phone_verified:true,
            address:this.state.user.address,
            nic:this.state.user.nic
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then( response => {
            //console.log(response)
            this.resetState()
            //console.log(this.state)
            //console.log(this.props)
            //this.props.history.push('/admin/dashboard/requests')
            this.fetchData()
            
        }).catch( error => {
            console.log(error)
            this.resetState()
        })
        */    
    }

    acceptCloseHandler = () => {
        this.resetState()
    }

    formDataHandler = (event,field) => {
        const updatedForm = {
            ...this.state.user
        };
        updatedForm[field] = event.target.value
        this.setState({user:updatedForm})
    }

    render(){
        const {classes} = this.props
        //console.log(this.props.uid)
        //console.log(this.props.token)
        let tabledata = []
        if (this.state.requestArray !== null){
            tabledata = this.state.requestArray.map(entry => (
                {
                    ownerID:entry.owner,
                    busID: entry.id,
                    origin:entry.origin,
                    destination:entry.destination,
                    busNumber:entry.busNo,
                    busType: entry.type,
                    date: secondsToDate(entry.date._seconds*1000)
                }
            ))
        }

        return (
            <React.Fragment>
                <Paper className={classes.table}>
                    <MaterialTable
                        style={{overflowY: 'scroll', maxHeight: '90vh'}}
                        title="Bus Registration Requests"
                        columns={[
                            { title: 'Owner ID', field: 'ownerID' },
                            { title: 'Bus ID', field:'busID'},
                            { title: 'Origin', field: 'origin' },
                            { title: 'Destination', field: 'destination' },
                            { title: 'Bus Number', field: 'busNumber'},
                            { title: 'Bus Type', field: 'busType'},
                            { title: 'Date', field: 'date', type: 'date' }
                        ]}
                        data={tabledata}
                        actions={[
                            {
                                icon:()=><VerifiedUserIcon color='primary'/>,
                                tooltip: 'Accept Request',
                                onClick: (event, rowData) => {
                                    /*const newState = updateObject(this.state.user,{
                                        id:rowData.userID,
                                        address: rowData.address,
                                        phoneNumber:rowData.busNumber,
                                    })
                                    this.setState({user:newState, accepting:true})*/
                                }
                            },
                            {
                                icon:()=><CancelIcon color='error' />,
                                tooltip: 'Decline Request',
                                onClick: (event, rowData) => {
                                    console.log(rowData.busID)
                                    const newState = updateObject(this.state.user,{
                                        busID:rowData.busID
                                    })
                                    this.setState({user:newState, rejecting:true})
                                }
                            }

                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </Paper>
                <ConfirmDialog 
                    title={"Are you sure that you want to reject the request?"}
                    description={"Note that this will permanenlty remove the Bus Registration Request from the System."}
                    clicked={this.state.rejecting}
                    handleClose={this.rejectNoHandler}
                    handleConfirm={this.rejectYesHandler}
                />
                {/* RegisterDialog Comes Here */}
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

export default connect(mapStateToProps)(withStyles(styles)(RequestBus));