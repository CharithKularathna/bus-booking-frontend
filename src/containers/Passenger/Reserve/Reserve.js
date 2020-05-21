import React, { Component } from 'react'
import { Card, CardHeader, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ReserveSelect from './ReserveSelect/ReserveSelect';
import { updateObject, stringCapitalize } from '../../../store/utility'


const styles = theme => ({
    heading:{
        textTransform: 'capitalize',
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    mainCard: {
        width: '100%',
        height: '15rem',

    },
    
})

class Reserve extends Component {
    state = {
        options:[
            'Ambalangoda','Ampara','Anuradhapura','Badulla','Bandarawela','Colombo','Embilipitiya',
            'Galle','Hambanthota','Jaffna','Kataragama','Kurunegala','Monaragala','Matara','Ratnapura',

        ],
        searched:false,
        turn: {
            start: "",
            destination: ""
        }
    }
    /*
    submitHandler = (event) => {
        event.preventDefault();
        setTimeout(()=>{
            this.setState({searched:true})
        },2000)
    }
    */

    onChangeHandler = (event, field) => {
        switch (field){
            case 1:
                let oldTurn1 = this.state.turn
                let newTurn1 = updateObject(oldTurn1,{start:event.target.value})
                this.setState({turn: newTurn1})
                break;
            case 2:
                let oldTurn2 = this.state.turn
                let newTurn2 = updateObject(oldTurn2,{destination:event.target.value})
                this.setState({turn: newTurn2})
                break;
            default:
                break;

        }
    }

    render(){
        const menuItems= this.state.options.map(city => (
            <MenuItem key={city} value={city.toLowerCase()}>{city}</MenuItem>
        ))


        
        const {classes} = this.props;

        return(
            <React.Fragment>
                <Card className={classes.mainCard} style={{backgroundColor:"#F5EE9E"}}>
                    <CardHeader className={classes.heading} title="Reserve a Bus Seat" subheader="Search a Bus by start, destination and date of your travel"/>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <ReserveSelect 
                                    label="Start"
                                    options={this.state.options}
                                    turn={this.state.turn}
                                    changeHandler={(event)=>this.onChangeHandler(event,1)}
                                    value={this.state.turn.start}
                                    helperText={"From " + stringCapitalize(this.state.turn.start)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <ReserveSelect 
                                    label="Destination"
                                    options={this.state.options}
                                    turn={this.state.turn}
                                    changeHandler={(event)=>{this.onChangeHandler(event,2)}}
                                    value={this.state.turn.destination}
                                    helperText={"To " + stringCapitalize(this.state.turn.destination)}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
                        
                </Card>
                
                    
            </React.Fragment> 
        )
    }
}

export default withStyles(styles)(Reserve);