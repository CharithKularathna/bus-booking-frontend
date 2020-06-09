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
import axios from 'axios'
import { secondsToDate, updateObject, phoneNumberFormatter, secondsToDateTime } from '../../../store/utility'
import ConfirmDialog from '../../../components/UI/Dialog/ConfirmDialog/ConfirmDialog'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Alert from '../../../components/UI/Alert/Alert';
import TableDialog from '../../../components/UI/Dialog/TableDialog/TableDialog'


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
        loading: true,
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
                this.setState({owners:response.data.ownersJson.owners, loading:false})
            } )
            .catch( error => {
                //console.log('error')
                //console.log(error.response)
            } );
    }

    resetTurnState = () => {
        const newState = updateObject(this.state,{
            loading:false,
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
        this.setState({loading:true, error:null})
        axiosInstance.post('getactiveturnsofownerbyadmin/' + this.props.uid,{
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
                loading:false,
                activeTurns: response.data.turnsJson.turns,
                pastTurns: null,
                activeLoading: true,
                pastLoading: false,
                selectedOwnerID: id
            }
            this.setState(newState)

        }).catch( error => {
            console.log('err')
            const newState = {
                error: error.message,
                loading: false,
                pastTurns: null,
                activeTurns: null,
                pastLoading: false,
                activeLoading: false,
                selectedOwnerID: ''
            }
            this.setState(newState)
        })

        
    }

    pastTurnsHandler = (id) => {
        this.setState({loading:true, error:null})
        axiosInstance.post('getpastturnsofownerbyadmin/' + this.props.uid,{
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
                loading: false,
                pastTurns: response.data.turnsJson.turns,
                activeTurns: null,
                pastLoading: true,
                activeLoading: false,
                selectedOwnerID: id
            }
            this.setState(newState)
            
        }).catch( error => {
            console.log("err")
            const newState = {
                error: error.message,
                loading: false,
                pastTurns: null,
                activeTurns: null,
                pastLoading: false,
                activeLoading: false,
                selectedOwnerID: ''
            }
            this.setState(newState)
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

        let errorMessage = null
        if (this.state.error != null){
            errorMessage = <Alert type="Error">No Past Turns were Found for the Bus Owner</Alert>
        }
        
        let activeTurnsData = null;
        let pastTurnsData = null;
        const turnColumns = [
            { title: 'Turn ID', field: 'turnID' },
            { title: 'Route', field:'routeID'},
            { title: 'Bus Number', field: 'busNo' },
            { title: 'Origin', field: 'origin' },
            { title: 'Departure', field: 'departure'},
            { title: 'Duration', field: 'duration'},
            { title: 'Normal Seat Price', field: 'normalSeatPrice'},
            { title: 'Window Seat Price', field: 'windowSeatPrice'}
        ]
        if (this.state.activeTurns != null){
            activeTurnsData = this.state.activeTurns.map(turn => (
                {
                    turnID: turn.turnId,
                    routeID: turn.routeId,
                    busNo: turn.busNo,
                    origin: turn.startStation,
                    departure: secondsToDateTime(parseInt(turn.departureTime._seconds)),
                    duration: (parseInt(turn.duration) / 60).toString() + ' min',
                    normalSeatPrice: turn.NormalSeatPrice,
                    windowSeatPrice: turn.windowSeatPrice
                }
            ))

        }

        if (this.state.pastTurns != null){
            pastTurnsData = this.state.pastTurns.map(turn => (
                {
                    turnID: turn.turnId,
                    routeID: turn.routeId,
                    busNo: turn.busNo,
                    origin: turn.startStation,
                    departure: secondsToDateTime(parseInt(turn.departureTime._seconds)),
                    duration: (parseInt(turn.duration) / 60000).toString() + ' min',
                    normalSeatPrice: turn.NormalSeatPrice,
                    windowSeatPrice: turn.windowSeatPrice
                }
            ))

        }


        let mainTable = <div style={{marginTop:'150px'}} ><Spinner /></div>
        if (this.state.loading == false){
            mainTable = (
                <Paper className={classes.table}>
                    {errorMessage}
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
                </Paper>)
        }

        return (
            <React.Fragment>
                {mainTable}
                {/* RegisterDialog Comes Here */}
                <TableDialog 
                    clicked={this.state.activeLoading}
                    handleClose={this.closeHandler}
                    columns={turnColumns}
                    tabledata={activeTurnsData}
                    title="Active Turns"
                    fullWidth={true}
                />
                <TableDialog 
                    clicked={this.state.pastLoading}
                    handleClose={this.closeHandler}
                    columns={turnColumns}
                    tabledata={pastTurnsData}
                    title="Past Turns"
                    fullWidth={true}
                />
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