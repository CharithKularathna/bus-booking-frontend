import React, { Component } from 'react'
import MaterialTable from 'material-table'
import  { connect } from 'react-redux'
import axiosInstance from '../../../axiosAuth'
import { withStyles } from '@material-ui/core/styles'
import { secondsToDateTime, updateObject } from '../../../store/utility'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Paper from '@material-ui/core/Paper'
import CancelIcon from '@material-ui/icons/Cancel';
import ConfirmDialog from '../../../components/UI/Dialog/ConfirmDialog/ConfirmDialog'
import Alert from '../../../components/UI/Alert/Alert'

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

class Bookings extends Component{
    state={
        loading:true,
        bookingsArray:null,
        dialogLoading:false,
        selectedBooking:null,
        error:null,
        messsage:null
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        axiosInstance.get( 'getactivebookings/' + this.props.uid, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }})
            .then( response => {
                console.log(response.data)
                this.setState({bookingsArray:response.data.turns, loading:false})
            } )
            .catch( error => {
                console.log('error')
                console.log(error.response)
            } );
    }

    resetTurnState = () => {
        const newState = updateObject(this.state,{
            selectedBooking:null,
            dialogLoading:false
        })
        this.setState(newState)
    }

    closeHandler = () => {
        this.resetTurnState()
    }

    finishedHandler = () => {
        axiosInstance.put('cancelbooking/'+this.props.uid,{
            bookingId:this.state.selectedBooking
        },{
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then(response=>{
            console.log("Booking Cancelled")
            console.log(response)
            this.setState({message: "Booking Cancelled Successfully"})
        }).catch(error=>{
            console.log("Booking Error")
            console.log(error.response)
            this.setState({error: error.response.data.message})
        })
        this.resetTurnState()
        this.fetchData()
    }

    cancelBookingHandler = (bookingID) => {
        this.setState({selectedBooking:bookingID, dialogLoading:true, error:null, message:null})
    }


    
    render(){
        const {classes} = this.props
        let tabledata = []
        if (this.state.bookingsArray){
            tabledata = this.state.bookingsArray.map(entry => (
                {
                    bookingID:entry.bookingid,
                    busNumber: entry.busNo,
                    route: entry.routeId,
                    seatNo: entry.seatId,
                    departure: secondsToDateTime(entry.departureTime._seconds),
                    conductorContact: entry.conductor_contact
                }
            ))
            console.log(tabledata)
        }

        let error = null;
        if (this.state.error != null){
            error = <Alert type="Error" title={this.state.error}></Alert>
        }

        let success = null;
        if (this.state.messsage != null){
            success = <Alert type="Success" title={this.state.messsage}></Alert>
        }

        let mainTable = <div style={{marginTop:'150px'}} ><Spinner /></div>
        if (this.state.loading == false){
            mainTable = (
                <Paper className={classes.table}>
                    <MaterialTable
                        style={{overflowY: 'scroll', maxHeight: '90vh'}}
                        title="Bookings"
                        columns={[
                            { title: 'Booking ID', field: 'bookingID' },
                            { title: 'Bus Number', field:'busNumber'},
                            { title: 'Route', field: 'route' },
                            { title: 'Seat Number', field: 'seatNo' },
                            { title: 'Departure', field: 'departure'},
                            { title: 'Conductor Contact No.', field: 'conductorContact'}
                        ]}
                        data={tabledata}
                        actions={[
                            {
                                icon:()=><CancelIcon color='error'/>,
                                tooltip: 'Cancel Booking',
                                onClick: (event, rowData) => {
                                    this.cancelBookingHandler(rowData.bookingID)
                                    /*const newState = updateObject(this.state.user,{
                                        id:rowData.userID,
                                        address: rowData.address,
                                        phoneNumber:rowData.busNumber,
                                    })
                                    this.setState({user:newState, accepting:true})*/
                                }
                            }

                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </Paper>)
        }

        return(
            <React.Fragment>
                {error}
                {success}
                {mainTable}
                <ConfirmDialog 
                    title={"Are you sure that you want to cancel the Booking?"}
                    description={"Note that this action is not reversible"}
                    clicked={this.state.dialogLoading}
                    handleClose={this.closeHandler}
                    handleConfirm={this.finishedHandler}
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

export default connect(mapStateToProps)(withStyles(styles)(Bookings));