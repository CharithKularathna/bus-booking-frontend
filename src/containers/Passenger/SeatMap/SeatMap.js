import React, { Component } from 'react'
import { connect } from 'react-redux'
import axiosInstance from '../../../axiosAuth'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Seat54Layout from '../../../components/UI/SeatLayout/Seat54Layout/Seat54Layout'

class SeatMap extends Component {
    state = {
        seatArray: null,
        busType: null
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
            <Paper style={{width:'95%', marginTop:'10px', marginBottom:'10px'}}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        {seatLayout}
                    </Grid>
                    <Grid item xs={3}>
                    
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