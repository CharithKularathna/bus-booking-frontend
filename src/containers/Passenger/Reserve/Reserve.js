import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReserveSelect from '../GetRoutes/ReserveSelect/ReserveSelect'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import MenuItem from '@material-ui/core/MenuItem'
import axiosInstance from '../../../axiosAuth'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Alert from '../../../components/UI/Alert/Alert'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { stringCapitalize, multiWordCapitalize, getDateFromJson, getTimeFromJson } from '../../../store/utility'
import SearchCard from '../../../components/UI/SearchCard/SearchCard'
import Typography from '@material-ui/core/Typography'
import * as actions from '../../../store/actions/index'

const styles = theme => ({
    heading:{
        textTransform: 'capitalize',
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    mainCard: {
        width: '100%',
        height: '75vh',
        marginBottom: '10px',
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

class Reserve extends Component{
    state = {
        loading:true,
        options: null,
        route:'',
        turns:null,
        message:null
    }

    componentDidMount() {
        axiosInstance.get('getallroutes')
        .then(response => {
            console.log("res")
            console.log(response.data.routes)
            this.setState({loading:false, options:response.data.routes})
            console.log("res")
            
        })
        .catch(error => {
            console.log(error.response)
            console.log("error")
        })
    }

    onChangeHandler = (event) => {
        this.setState({route: event.target.value})
    }

    searchBuses = () => {
        axiosInstance.post('getturnbyroute',{
            routeId:multiWordCapitalize(this.state.route)
        })
        .then(response=>{
            console.log(response.data)
            if (response.data.hasOwnProperty('message')) {
                this.setState({message:response.data.message})
            }
            if (response.data.hasOwnProperty('turns')) {
                this.setState({turns:response.data.turns, message:null})
            }
        })
        .catch(error => {
            console.log('err')
            console.log(error)
        })
    }

    goToSeatMap = (event, turnID, startStation, endStation) => {
        console.log(turnID)
        this.props.onReserve(turnID, startStation, endStation)
        this.props.history.push('/passenger/dashboard/reserve/seatmap')
    }

    render(){
        console.log(this.state)
        const {classes} = this.props;
        let optionsArray = [];
        if (this.state.options != null){
            optionsArray = this.state.options.map(option=>(
                `${option.id}`
            ))
        }
        console.log(optionsArray)
        let message = null;
        if (this.state.message != null){
            message = (
                <div style={{marginTop:"-250px", width:'100%'}}>
                    <Alert type="Error">No Turns Found</Alert>
                </div>
            )
        }
        let mainCard = <div><Spinner /></div>
        if (this.state.loading == false){
            mainCard = (
                <Card className={classes.mainCard} >
                    <CardHeader className={classes.heading} title="Reserve a Bus Seat" subheader="Search a Bus using the Route"/>
                    <Divider className={classes.divider} />    
                        <Grid container spacing={3}>
                            <Grid item xs={10} sm={3} className = {classes.select}>
                                <ReserveSelect 
                                    label="Bus Route"
                                    options={optionsArray}
                                    turn={this.state.route}
                                    changeHandler={this.onChangeHandler}
                                    value={this.state.route}
                                    helperText=""
                                />
                            </Grid>
                            <Grid item xs={10} sm={3} className = {classes.select}>
                                
                            </Grid>
                            <Grid item xs={10} sm={3} className = {classes.select}>
                                
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
            )
        }
        let results = null;
        let resultsTitle = null;
        let resultsFooter = null;
        if (this.state.turns != null){
            results = this.state.turns.map(turn => (
                <SearchCard
                    key={turn.turnId}
                    from={turn.startStation}
                    to={turn.endStation}
                    date={getDateFromJson(turn.departureTime)}
                    departure={getTimeFromJson(turn.departureTime)}
                    arrival={getTimeFromJson(turn.arrivalTime)}
                    busNumber={"NA-9900"}
                    seatArrangement={turn.busType}
                    clicked={(event)=>this.goToSeatMap(event,turn.turnId,turn.startStation,turn.endStation)}
                />
            ))
            resultsFooter = <p style={{color:'grey',textAlign:'center'}}>Page 1 of 1</p>
            if (this.state.message == null){
                resultsTitle = (
                    <div style={{textAlign: 'left', marginBottom:'10px', height:'80px', marginTop:'-260px'}} >
                        <Typography variant='h5'>Search Results</Typography>
                        <Divider variant='fullWidth' style={{width:'100%'}}/>
                    </div>
                    
                )
            }
        }
        return(
            <React.Fragment>
                {mainCard}
                {resultsTitle}
                {message}
                {results}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onReserve: (turnID,startStation,endStation) => dispatch(actions.storeTurn(turnID,startStation,endStation))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Reserve));