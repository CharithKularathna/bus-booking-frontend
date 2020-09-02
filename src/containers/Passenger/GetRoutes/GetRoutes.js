import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import ReserveSelect from './ReserveSelect/ReserveSelect';
import DatePicker from './DatePicker/DatePicker'
import { updateObject, stringCapitalize } from '../../../store/utility'


const styles = theme => ({
    heading:{
        textTransform: 'capitalize',
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    mainCard: {
        width: '100%',
        height: '75vh',
        background: "linear-gradient(180deg, #AED9E0 0%, #F5F5DC 75%)",
        boxShadow: "0 3px 5px 2px rgba(100, 100, 100, .1)",
        [theme.breakpoints.up('sm')]:{
            height: '14rem'
        }

    },
    button: {
        marginTop: '20px',
        marginLeft: '1.875rem',
        width: '100%'
    },
    select: {
        marginLeft: '12px'
    },
    divider: {
        marginBottom: '5px',
        width: '98%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
    
})

class GetRoutes extends Component {
    state = {
        options:[
            'Ambalangoda','Ampara','Anuradhapura','Badulla','Bandarawela','Colombo','Embilipitiya',
            'Galle','Hambanthota','Jaffna','Kataragama','Kurunegala','Monaragala','Matara','Ratnapura','Jafna','Trincomalee','Moratuwa',
            'Pettah','Piliyandala'
        ],
        searched:false,
        turn: {
            start: "",
            destination: "",
            date: ""
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
    componentDidMount() {
        const today = new Date();
        const currentDate = today.getFullYear()+'-'+String((today.getMonth()+1)).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');
        let oldTurn = this.state.turn
        let newTurn = updateObject(oldTurn,{date:currentDate})
        this.setState({turn: newTurn})
        console.log(newTurn)
    }

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
            case 3:
                let oldTurn3 = this.state.turn
                let newTurn3 = updateObject(oldTurn3,{date:event.target.value})
                this.setState({turn: newTurn3})
                console.log(newTurn3)
                break;
            default:
                break;

        }
    }

    searchBuses = () => {
        return
    }

    render(){
        const menuItems= this.state.options.map(city => (
            <MenuItem key={city} value={city.toLowerCase()}>{city}</MenuItem>
        ))


        
        const {classes} = this.props;

        return(
            <React.Fragment>
                <Card className={classes.mainCard} >
                    <CardHeader className={classes.heading} title="Get Routes" subheader="Search a Bus by start, destination and date of your travel"/>
                    <Divider className={classes.divider} />    
                        <Grid container spacing={3}>
                            <Grid item xs={10} sm={3} className = {classes.select}>
                                <ReserveSelect 
                                    label="Start"
                                    options={this.state.options}
                                    turn={this.state.turn}
                                    changeHandler={(event)=>this.onChangeHandler(event,1)}
                                    value={this.state.turn.start}
                                    helperText={"From " + stringCapitalize(this.state.turn.start)}
                                    
                                />
                            </Grid>
                            <Grid item xs={10} sm={3} className = {classes.select}>
                                <ReserveSelect 
                                    label="Destination"
                                    options={this.state.options}
                                    turn={this.state.turn}
                                    changeHandler={(event)=>{this.onChangeHandler(event,2)}}
                                    value={this.state.turn.destination}
                                    helperText={"To " + stringCapitalize(this.state.turn.destination)}
                                    
                                />
                            </Grid>
                            <Grid item xs={10} sm={3} className = {classes.select}>
                                <DatePicker 
                                    value = {this.state.turn.date}
                                    changed = {(event) => {this.onChangeHandler(event,3)}}
                                    
                                />
                            </Grid>
                                
                            <Grid item xs={10} sm={2} >
                                <Button 
                                    color='primary' 
                                    variant='contained' 
                                    onClick={this.searchBuses}
                                    className={classes.button}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                        
                </Card>
                    
            </React.Fragment> 
        )
    }
}

export default withStyles(styles)(GetRoutes);