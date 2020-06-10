import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Seat from '../../Seat/Seat'

const seat54Layout = props => {
    let seatArray = props.seatArray
    let rows = [[],[],[],[],[],[],[],[],[],[null,null],[]]
    for (let seat of seatArray){
        if(parseInt(seat.id)<=5){
            rows[0].push(seat)
        }
        else if(parseInt(seat.id)<=10){
            rows[1].push(seat)
        }
        else if(parseInt(seat.id)<=15){
            rows[2].push(seat)
        }
        else if(parseInt(seat.id)<=20){
            rows[3].push(seat)
        }
        else if(parseInt(seat.id)<=25){
            rows[4].push(seat)
        }
        else if(parseInt(seat.id)<=30){
            rows[5].push(seat)
        }
        else if(parseInt(seat.id)<=35){
            rows[6].push(seat)
        }
        else if(parseInt(seat.id)<=40){
            rows[7].push(seat)
        }
        else if(parseInt(seat.id)<=45){
            rows[8].push(seat)
        }
        else if(parseInt(seat.id)<=48){
            rows[9].push(seat)
        }
        else if(parseInt(seat.id)<=54){
            rows[10].push(seat)
        }
    }
    const seat10 = rows[1].shift()
    rows[1].push(seat10)
    for (let i = 0; i < 10; i++) {
        rows[i].splice(2,0,null)
    }
    console.log(rows)

    const seatMaker = (row) => {
        return row.map(seat => {
            if (seat == null){
                return (
                    <Seat
                        type={'Blank'}
                    />
                )
            }
            else {
                if(seat.status=="Available"){
                    return (
                        <Seat
                            type={'Available'}
                            available
                            key={seat.id}
                            id={seat.id}
                            clicked={props.clicked}
                        />
                    )
                }
                else if(seat.status=="Selected"){
                    return (
                        <Seat
                            type={'Selected'}
                            selected
                            key={seat.id}
                            id={seat.id}
                            clicked={props.clicked}
                        />
                    )
                }
                else if(seat.status=="Unavailable"){
                    return (
                        <Seat
                            type={'Unavailable'}
                            unavailable
                            key={seat.id}
                            id={seat.id}
                            
                        />
                    )
                }
            }
        })
    }

    return(
        <div>
            <Grid container style={{marginLeft:'100px',marginTop:'40px'}} >
                <Grid item xs={12}>
                    {seatMaker(rows[0])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[1])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[2])}    
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[3])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[4])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[5])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[6])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[7])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[8])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[9])}
                </Grid>
                <Grid item xs={12}>
                    {seatMaker(rows[10])}
                </Grid>
            </Grid>
        </div>
    )
}

export default seat54Layout;