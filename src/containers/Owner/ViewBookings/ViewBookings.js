import React,{ Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MaterialTable from 'material-table'
import  { connect } from 'react-redux'
import axiosInstance from '../../../axiosAuth'
import { withStyles } from '@material-ui/core/styles'
import { secondsToDateTime, updateObject } from '../../../store/utility'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Paper from '@material-ui/core/Paper'
import TodayIcon from '@material-ui/icons/Today'
import Seat54Layout from '../../../components/UI/SeatLayout/Seat54Layout/Seat54Layout'

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

class ViewBookings extends Component{
    state={
        loading:true,
        turnsArray:null,
        selectedTurn:null,
        bookingsLoading:false,
        seatsArray:null
    }
    componentDidMount () {
        this.fetchData()
    }

    fetchData = () => {
        axiosInstance.get( 'getactiveturnsbyowner/' + this.props.uid, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }})
            .then( response => {
                console.log(response.data)
                this.setState({turnsArray:response.data.turnsJson.turns, loading:false})
            } )
            .catch( error => {
                console.log('error')
                console.log(error.response)
            } );
    }

    resetTurnState = () => {
        const newState = updateObject(this.state,{
            selectedTurn:null,
            bookingsLoading:false
        })
        this.setState(newState)
    }

    finishedHandler = () => {
        this.resetTurnState()
    }


    closeHandler = () => {
        this.resetTurnState()
    }

    viewBookingsHandler = (turnID) => {
        this.setState({loading:true})
        console.log(turnID)
        axiosInstance.post('getturndetails/' + this.props.uid,{
            turnId: turnID
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        })
        .then(response => {
            console.log(response.data)
            const newState = {
                loading: false,
                seatsArray: response.data.seats,
                bookingsLoading: true
            }
            this.setState(newState)

        })
        .catch(err=>{
            console.log('err')
            console.log(err)
            const newState = {
                loading: false
            }
            this.setState(newState)
        })
    }

    seatClickHandler = () => {

    }

    render(){
        const {classes} = this.props
        //console.log(this.state)
        let tabledata = []
        if (this.state.turnsArray !== null){
            tabledata = this.state.turnsArray.map(entry => (
                {
                    turnID:entry.turnId,
                    busNumber: entry.busNo,
                    start:entry.startStation,
                    normalSeatPrice:entry.NormalSeatPrice,
                    windowSeatPrice:entry.windowSeatPrice,
                    departure: secondsToDateTime(entry.departureTime._seconds)
                }
            ))
            //console.log(tabledata)
        }

        let mainTable = <div style={{marginTop:'150px'}} ><Spinner /></div>
        if (this.state.loading == false){
            mainTable = (
                <Paper className={classes.table}>
                    <MaterialTable
                        style={{overflowY: 'scroll', maxHeight: '90vh'}}
                        title="Turns and Bookings"
                        columns={[
                            { title: 'Turn ID', field: 'turnID' },
                            { title: 'Bus Number', field:'busNumber'},
                            { title: 'Start Station', field: 'start' },
                            { title: 'Normal Seat Price', field: 'normalSeatPrice' },
                            { title: 'Window Seat Price', field: 'windowSeatPrice'},
                            { title: 'Departure', field: 'departure'}
                        ]}
                        data={tabledata}
                        actions={[
                            {
                                icon:()=><TodayIcon color='primary'/>,
                                tooltip: 'View Bookings',
                                onClick: (event, rowData) => {
                                    this.viewBookingsHandler(rowData.turnID)
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
                {mainTable}
                <Dialog
                    open={this.state.bookingsLoading}
                    onClose={this.closeHandler}
                    fullWidth
                    maxWidth='lg'
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    style={{textAlign:'center'}}
                >
                    <DialogTitle id="alert-dialog-title" >{"Bookings"}</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={9}>
                                <Seat54Layout 
                                    seatArray={this.state.seatsArray}
                                    clicked={this.seatClickHandler}
                            />
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container>
                                    <Grid item xs={12} style={{marginTop:'25px'}}>
                                        <Typography variant='body1'>Not Booked</Typography>
                                        <Button variant='contained' disabled style={{width:'55px', height:'55px', backgroundColor:'green'}}></Button>
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop:'10px'}}>
                                        <Typography variant='body1'>Booked</Typography>
                                        <Button variant='contained' disabled style={{width:'55px', height:'55px', backgroundColor:'lightgrey'}}></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </DialogContent>
                </Dialog>
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

export default connect(mapStateToProps)(withStyles(styles)(ViewBookings));