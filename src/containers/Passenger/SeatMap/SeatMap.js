import React, { Component } from 'react'
import { connect } from 'react-redux'
import axiosInstance from '../../../axiosAuth'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Seat54Layout from '../../../components/UI/SeatLayout/Seat54Layout/Seat54Layout'
import Typography from '@material-ui/core/Typography'

class SeatMap extends Component {
    state = {
        seatArray: null,
        busType: null,
        totalPrice: 0.00
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
            this.setState({seatArray:seatsArray, busType:busType})
        })
        .catch(error => {
            console.log('error')
            console.log(error)
        })

    }



    render(){
        let seatLayout = null;
        switch (this.state.busType) {
            case 54:
                seatLayout = (
                    <Seat54Layout 
                        seatArray={this.state.seatArray}
                    />
                )
                break;
            default:
                seatLayout = null
        }
        console.log(this.state)
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
                                <Typography variant='h4'>{'LKR ' + this.state.totalPrice.toString()}</Typography>
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'40px'}}>
                                <Button color='primary' variant='contained'>Proceed</Button>
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

export default connect(mapStateToProps)(SeatMap);