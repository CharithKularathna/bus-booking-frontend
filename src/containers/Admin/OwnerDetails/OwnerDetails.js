import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import MaterialTable from "material-table";
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import HistoryIcon from '@material-ui/icons/History';
import  { connect } from 'react-redux'
import axiosInstance from '../../../axiosAuth'
import { secondsToDate, updateObject, phoneNumberFormatter } from '../../../store/utility'
import ConfirmDialog from '../../../components/UI/Dialog/ConfirmDialog/ConfirmDialog'
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

class OwnerDetails extends Component {
    state = {
        activeLoading:false,
        pastLoading:false,
        adminID:this.props.uid,
        token:this.props.token,
        error:null,
        owners: null,
        pastTurns: null,
        activeTurns: null,
        selectedOwnerID: ''
    }

    componentDidMount () {
        this.fetchData()
    }

    fetchData = () => {
        axiosInstance.get( 'getowners/' + this.props.uid, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }})
            .then( response => {
                console.log(response.data.ownersJson)
                this.setState({owners:response.data.ownersJson.owners})
            } )
            .catch( error => {
                //console.log('error')
                console.log(error.response)
            } );
    }

    resetTurnState = () => {
        const newState = updateObject(this.state,{
            activeLoading:false,
            pastLoading:false,
            error:null,
            pastTurns: null,
            activeTurns: null
        })
        this.setState(newState)
    }

    finishedHandler = () => {
        this.resetTurnState()
    }


    closeHandler = () => {
        this.resetTurnState()
    }
    /*
    formDataHandler = (event,field) => {
        const updatedForm = {
            ...this.state.selectedOwner
        };
        updatedForm[field] = event.target.value
        this.setState({selectedOwner:updatedForm})
    }
    */
   activeTurnsHandler = (id) => {
        axiosInstance.get('getactiveturnsofownerbyadmin/' + this.props.uid,{
            ownerUid:id
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then( response => {
            console.log("res")
            console.log(response.data)
            const newState = {
                activeTurns: response.data.requestTime,
                pastTurns: null,
                activeLoading: true,
                pastLoading: false,
                selectedOwnerID: id
            }
            this.setState(newState)

        }).catch( error => {
            console.log('err')
            console.log(error.response)
        })

        
    }

    pastTurnsHandler = (id) => {
        axiosInstance.get('getpastturnsofownerbyadmin/' + this.props.uid,{
            ownerUid:id
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then( response => {
            console.log("res")
            console.log(response.data)
            const newState = {
                pastTurns: response.data.requestTime,
                activeTurns: null,
                pastLoading: true,
                activeLoading: false,
                selectedOwnerID: id
            }
            this.setState(newState)
            
        }).catch( error => {
            console.log("err")
            console.log(error.response)
        })

    }
    render(){
        console.log(this.state)
        const {classes} = this.props
        //console.log(this.props.uid)
        //console.log(this.props.token)
        let tabledata = []
        if (this.state.owners !== null){
            tabledata = this.state.owners.map(entry => (
                {
                    ownerID:entry.ownerUid,
                    name: entry.name,
                    email:entry.email,
                    mobileNumber:entry.phoneNumber,
                    address:entry.address,
                    nic: entry.NIC
                }
            ))
        }

        return (
            <React.Fragment>
                <Paper className={classes.table}>
                    <MaterialTable
                        style={{overflowY: 'scroll', maxHeight: '90vh'}}
                        title="Owner Details and Turns"
                        columns={[
                            { title: 'Owner ID', field: 'ownerID' },
                            { title: 'Name', field:'name'},
                            { title: 'Email', field: 'email' },
                            { title: 'Mobile Number', field: 'mobileNumber' },
                            { title: 'Address', field: 'address'},
                            { title: 'NIC Number', field: 'nic'}
                        ]}
                        data={tabledata}
                        actions={[
                            {
                                icon:()=><TodayIcon color='primary'/>,
                                tooltip: 'View Active Turns',
                                onClick: (event, rowData) => {
                                    this.activeTurnsHandler(rowData.ownerID)
                                    /*const newState = updateObject(this.state.user,{
                                        id:rowData.userID,
                                        address: rowData.address,
                                        phoneNumber:rowData.busNumber,
                                    })
                                    this.setState({user:newState, accepting:true})*/
                                }
                            },
                            {
                                icon:()=><HistoryIcon color='error' />,
                                tooltip: 'View Past Turns',
                                onClick: (event, rowData) => {
                                    this.pastTurnsHandler(rowData.ownerID)
                                    
                                    /*console.log(rowData.busID)
                                    const newState = updateObject(this.state.user,{
                                        busID:rowData.busID
                                    })
                                    this.setState({user:newState, rejecting:true})
                                    */
                                }
                            }

                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </Paper>
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

export default connect(mapStateToProps)(withStyles(styles)(OwnerDetails));