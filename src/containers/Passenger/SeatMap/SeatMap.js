import React, { Component } from 'react'
import { connect } from 'react-redux'
import axiosInstance from '../../../axiosAuth'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Seat54Layout from '../../../components/UI/SeatLayout/Seat54Layout/Seat54Layout'
import Typography from '@material-ui/core/Typography'
import * as actions from '../../../store/actions/index'

class SeatMap extends Component {
    state = {
        seatArray: null,
        busType: null,
        totalPrice: 0,
        selectedSeats: [],
        isAllSeatsBooked: false
    }


    componentDidMount() {
        //console.log(this.props.turnID)
        axiosInstance.post('getseatsdetailspassenger/' + this.props.uid,{
            turnId: this.props.turnID
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        })
        .then(response => {
            const seatsArray = response.data.seats
            const busType = seatsArray.length
            const allBooked = this.seatBookChecker(seatsArray)
            this.setState({seatArray:seatsArray, busType:busType, isAllSeatsBooked:allBooked})
        })
        .catch(error => {
            console.log('error')
            console.log(error)
        })

    }

    seatClickHandler = (event, id) => {
        let newSeatsArray = this.state.seatArray
        let newTotalPrice = this.state.totalPrice
        let newSelectedSeats = this.state.selectedSeats
        for (let seat of newSeatsArray){
            if (seat.id.toString() == id.toString()){
                if (seat.status == "Available"){
                    seat.status = "Selected"
                    newTotalPrice = newTotalPrice + parseInt(seat.price)
                    newSelectedSeats.push(id)
                    break;
                }
                else if (seat.status == "Selected"){
                    seat.status = "Available"
                    newTotalPrice = newTotalPrice - parseInt(seat.price)
                    for (let i = 0; i < newSelectedSeats.length; i++){
                        if (newSelectedSeats[i].toString() == id.toString()){
                            newSelectedSeats.splice(i,1)
                            break;
                        }
                    }
                    break;
                }
            }
        }
        console.log(newSelectedSeats)
        this.setState({seatArray: newSeatsArray, totalPrice:newTotalPrice, selectedSeats:newSelectedSeats})
    }

    proceedHandler = () => {
        const selectedSeats = this.state.selectedSeats.map(id => (
            parseInt(id)
        ))
        const totalPrice = parseInt(this.state.totalPrice)
        this.props.onProceed(totalPrice, selectedSeats)
        this.props.history.push('/passenger/dashboard/reserve/checkout')
    }

    seatBookChecker = (array) => {
        for (let seatObject of array){
            if (seatObject.status != "Unavailable"){
                return false
            }
        }
        return true
    }

    waitingListHandler = () => {
        axiosInstance.post('addtowaiting/' + this.props.uid, {
            turnId: this.props.turnID
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        })
        .then(response=>{
            console.log('Response WaitingList')
            this.setState({isAllSeatsBooked:false})
        })
        .catch(err=>{
            console.log(err)
            console.log('error')
        })
    }

    render(){
        let seatLayout = null;
        switch (this.state.busType) {
            case 54:
                seatLayout = (
                    <Seat54Layout 
                        seatArray={this.state.seatArray}
                        clicked={this.seatClickHandler}
                    />
                )
                break;
            default:
                seatLayout = null
        }
        console.log(this.state)

        let waitingListButton = null;
        if (this.state.isAllSeatsBooked){
            waitingListButton = (<Grid item xs={12}>
                <Button color='secondary' size='large' variant='contained' style={{width:'130px'}} onClick={this.waitingListHandler}>Add to the WaitingList</Button>
            </Grid>)
        }
        else {
            waitingListButton = (<Grid item xs={12}>
            <Button disabled color='secondary' size='large' variant='contained' style={{width:'130px'}} onClick={this.waitingListHandler}>Add to the WaitingList</Button>
        </Grid>)
        }
        return(
            <Paper style={{width:'95%', marginTop:'10px', marginBottom:'10px', textAlign:'center'}}>
                <Typography variant='h5' style={{marginTop:'10px'}}>Seat Configuration</Typography>
                <Divider variant='middle' />
                <Typography variant='subtitle1' style={{color:'grey'}} >Select Seats and Proceed to Payment to Reserve your Seat</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={9} style={{textAlign:'left'}}>
                        {seatLayout}
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} style={{marginTop:'40px'}}>
                                <Typography variant='body1'>Available</Typography>
                                <Button variant='contained' disabled style={{width:'55px', height:'55px', backgroundColor:'green'}}></Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body1'>Not Available</Typography>
                                <Button variant='contained' disabled style={{width:'55px', height:'55px', backgroundColor:'lightgrey'}}></Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body1'>Selected</Typography>
                                <Button variant='contained' disabled style={{width:'55px', height:'55px', backgroundColor:'lightblue'}}></Button>
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'180px'}}>
                                <Typography variant='h5'>Sub Total:</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h4'>{'LKR ' + this.state.totalPrice.toString() + '.00'}</Typography>
                            </Grid>
                            {waitingListButton}
                            <Grid item xs={12} style={{marginTop:'20px'}}>
                                <Button color='primary' size='large' variant='contained' style={{width:'130px'}} onClick={this.proceedHandler}>Proceed</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        turnID: state.booking.turnID,
        uid: state.signin.userID,
        token: state.signin.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onProceed: (totalPrice, selectedSeats) => dispatch(actions.proceedToPay(totalPrice, selectedSeats))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SeatMap);