import React, { Component } from 'react'
import axiosInstance from '../../../axiosAuth'
import { connect } from 'react-redux'
import Alert from '../../../components/UI/Alert/Alert';
import Divider from '@material-ui/core/Divider'
//import classes from './AddBus.css'
import Typography  from '@material-ui/core/Typography';
import Spinner from '../../../components/UI/Spinner/Spinner'
import CustomSelect from '../../../containers/Passenger/GetRoutes/ReserveSelect/ReserveSelect'
import { updateObject, stringCapitalize } from '../../../store/utility';
import DatePicker from './DatePicker/DatePicker'
import TimePicker from './TimePicker/TimePicker'

import classes from './AddTurn.css'

let initialState={
    validForm: false,
    error: false,
    loading: false,
    success: false,
    busArray: null,
    conductorArray: null,
    options:{
        busNo:[],
        conductor:[],
        origin:
            [
                'Ambalangoda','Ampara','Anuradhapura','Badulla','Bandarawela','Colombo','Embilipitiya',
                'Galle','Hambanthota','Jaffna','Kataragama','Kurunegala','Monaragala','Matara','Ratnapura','Jafna','Trincomalee','Moratuwa',
                'Pettah','Piliyandala'
            ]
        
        
    },
    selects:{
        origin:{
            label:"Origin (Starting City of the Journey)",
            value: '',
            error: true
        },
        busNo:{
            label:"Bus Number",
            value: '',
            error: true
        },
        conductor:{
            label:"Conductor Name",
            value:'',
            error: true
        }
    },
    dateselect: {
        label:"Date",
        value: '',
        error: true
    },
    timeselect: {
        label:"Departure",
        value: '',
        error: true
    },
    
}

let resetState = {
    validForm: false,
    error: false,
    loading: false,
    success: false,
    selects:{
        origin:{
            label:"Origin (Starting City of the Journey)",
            value: '',
            error: true
        },
        busNo:{
            label:"Bus Number",
            value: '',
            error: true
        },
        conductor:{
            label:"Conductor Name",
            value:'',
            error: true
        }
    },
    dateselect: {
        label:"Date",
        value: '',
        error: true
    },
    timeselect: {
        label:"Departure",
        value: '',
        error: true
    },
}

class AddTurn extends Component {
    state = initialState
    componentDidMount () {
        this.setState({loading: true})
        this.fetchBusData()
        this.fetchConductorData()
    }

    fetchBusData = () => {
        axiosInstance.get( 'getbuses/' + this.props.uid, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }})
            .then( response => {
                console.log(response.data.buses)
                const buses = response.data.buses
                const busArray = buses.map((bus)=>({
                    busNo: bus.busNo,
                    id: bus.id
                }))
                const busNoArray = buses.map((bus)=>(bus.busNo))
                const newOptions = updateObject(this.state.options,{
                    busNo:busNoArray
                })
                this.setState({busArray:busArray, options:newOptions})
            } )
            .catch( error => {
                console.log('error')
                console.log(error.response)
            } );
    }

    fetchConductorData = () => {
        axiosInstance.get( 'getconductors/' + this.props.uid, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }})
            .then( response => {
                console.log(response.data.conductors)
                const conductors = response.data.conductors
                const conductorArray = conductors.map((conductor)=>({
                    name: conductor.name,
                    id: conductor.id
                }))
                const conductorNameArray = conductors.map((conductor)=>(conductor.name))
                const newOptions = updateObject(this.state.options,{
                    conductor:conductorNameArray
                })
                this.setState({conductorArray:conductorArray, options:newOptions, loading:false})
            } )
            .catch( error => {
                console.log('error')
                console.log(error.response)
            } );
    }

    resetTurnState = () => {
        const newState = updateObject(this.state,resetState)
        this.setState(newState)
    }

    selectInputChangeHandler = (event, id) => {
        const updatedSelects = {
            ...this.state.selects
        };
        const updatedSelectsElement = { 
            ...updatedSelects[id]
        };
        updatedSelectsElement.value = event.target.value;
        let newError = true
        if (updatedSelectsElement.value !== "" && updatedSelectsElement.value !== "None"){
            newError = false 
        }
        updatedSelectsElement.error = newError
        updatedSelects[id] = updatedSelectsElement;
        this.setState({selects: updatedSelects});
    }

    selectDateHandler = (event) => {
        const updatedSelect = {
            ...this.state.dateselect
        };
        updatedSelect.value = event.target.value
        updatedSelect.error = false
        console.log(updatedSelect)
        this.setState({dateselect: updatedSelect})
    }

    selectTimeHandler = (event) => {
        const updatedSelect = {
            ...this.state.timeselect
        };
        updatedSelect.value = event.target.value
        updatedSelect.error = false
        console.log(updatedSelect)
        this.setState({timeselect: updatedSelect, validForm:true})
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state)
        const start = stringCapitalize(this.state.selects.origin.value);
        let busId = null;
        let conductorId = null;
        const dateString = this.state.dateselect.value
        const timeString = this.state.timeselect.value
        for (let busObject of this.state.busArray){
            if(busObject.busNo.toLowerCase() == this.state.selects.busNo.value){
                busId = busObject.id;
                break;
            }
        }

        for (let conductorObject of this.state.conductorArray){
            if(conductorObject.name.toLowerCase() == this.state.selects.conductor.value){
                conductorId = conductorObject.id;
                break;
            }
        }

        let d = dateString.split('-')
        let t = timeString.split(':')
        const dateObject = new Date(parseInt(d[0]),(parseInt(d[1])-1),parseInt(d[2]),parseInt(t[0]),parseInt(t[1]))
        const dateJSON = dateObject.toJSON()
        this.submitTurnData({
            busId:busId,
            ConductorId: conductorId,
            departureTime: dateJSON,
            startStation: start
        })
 
    }

    submitTurnData = (data) => {
        console.log(data)
        axiosInstance.post('addturn/' + this.props.uid,data,
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then( response => {
            console.log(response)
            this.setState({loading:false, success:true, error:false})
            
        }).catch( error => {
            console.log(error)
            if (error.response.status == 500 ||error.response.status == '500')
                this.setState({loading:false, success:true, error:false})
            else {
                this.setState({loading:false, error:true, success:false})
            }
            
        })
    }

    render() {
        const selectElementsArray = [];
        for (let key in this.state.selects) {
            selectElementsArray.push({
                id: key,
                config: this.state.selects[key]
            });
        }
        let selects = selectElementsArray.map(selectElement => (
            <CustomSelect 
                key={selectElement.id}
                label={selectElement.config.label}
                value={selectElement.config.value}
                changeHandler={(event)=> this.selectInputChangeHandler(event,selectElement.id)}
                options={this.state.options[selectElement.id]}
                isError={selectElement.config.error}
            />
        ))

        const dateSelect = <DatePicker
            label={this.state.dateselect.label}
            value={this.state.dateselect.value}
            changed={(event)=> this.selectDateHandler(event)}
        />

        const timeSelect = <TimePicker
            label={this.state.timeselect.label}
            value={this.state.timeselect.value}
            changed={(event)=> this.selectTimeHandler(event)}
        />
        
        let errorMessage = null;

        if (this.state.error){
            errorMessage = <Alert type="Danger">Unable to add the Bus Turn. Try again later</Alert>
        }

        let successMessage = null;

        if (this.state.success){
            successMessage = <Alert type="Success">Bus Turn Added Successfully</Alert>
        }

        let form = 
        (<form className={"form-signup "+ classes.form} style={{textAlign:'center'}} onSubmit={this.submitHandler}>
            <h1 className={"h3 mb-3 font-weight-normal"} style={{textAlign: 'center'}} >Add a Bus Turn</h1>
            <Typography variant='subtitle1' style={{paddingLeft:'10px', paddingRight:'10px'}}>Add the given details of the Turn and Submit</Typography>
            <br />
            <Divider variant='fullWidth' style={{marginBottom:'12px'}} />
            {errorMessage}
            {successMessage}
            {selects}
            {dateSelect}
            {timeSelect}
            {/*Select Inputs Here*/}
            <Typography variant='caption' style={{color:'grey', marginBottom:'1px'}}>Note: This is a turn that a passenger will see to book seats</Typography>
            <br />
            <button disabled={!this.state.validForm} className="btn btn-lg btn-primary btn-block">Submit</button>
        </form>)

        if (this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.root}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid: state.signin.userID,
        token: state.signin.token
    }
}


export default connect(mapStateToProps)(AddTurn)