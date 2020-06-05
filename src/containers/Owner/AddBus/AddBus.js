import React, { Component } from 'react'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import Alert from '../../../components/UI/Alert/Alert';
import Divider from '@material-ui/core/Divider'
import axiosInstance from '../../../axiosAuth'
import classes from './AddBus.css'
import Typography  from '@material-ui/core/Typography';
import Spinner from '../../../components/UI/Spinner/Spinner'
import { validateForm } from '../../../store/validate'
import CustomSelect from '../../../containers/Passenger/Reserve/ReserveSelect/ReserveSelect'

class AddBus extends Component {
    state={
        form:{
            route: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Route Number'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 1,
                    maxLength: 3
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Route Number'


            },
            busNo: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Bus Number (Ex: LF-1122)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                    maxLength: 8
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Bus Number'
            },
            duration: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Duration of the Journey (in Minutes)'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Time'
            }
        },
        validForm: false,
        error: false,
        loading: false,
        success: false,
        options:{
            origin:
                [
                    'Ambalangoda','Ampara','Anuradhapura','Badulla','Bandarawela','Colombo','Embilipitiya',
                    'Galle','Hambanthota','Jaffna','Kataragama','Kurunegala','Monaragala','Matara','Ratnapura'
                ],
            destination:
                [
                    'Ambalangoda','Ampara','Anuradhapura','Badulla','Bandarawela','Colombo','Embilipitiya',
                    'Galle','Hambanthota','Jaffna','Kataragama','Kurunegala','Monaragala','Matara','Ratnapura'
                ],
            bustype:
                [
                    'Seat 49','Seat 30','Seat 54','Seat 44'
                ]
        },
        selects:{
            origin:{
                label:"Origin (Starting City of the Journey)",
                value: '',
                error: true
            },
            destination:{
                label:"Destination (Ending City of the Journey)",
                value: '',
                error: true
            },
            bustype:{
                label:"Bus Type",
                value:'',
                error: true
            }

        }
    }

    checkValidity(value, rules) {
        const validation = validateForm(value,rules)
        return validation
    }

    checkFormValidity = (form) => {
        let isFormValid = true
        for (let key in form) {
            isFormValid = form[key].valid && isFormValid
        }
        return isFormValid
    }

    inputChangeHandler = (event,elementID) => {
        const updatedForm = {
            ...this.state.form
        };
        const updatedFormElement = { 
            ...updatedForm[elementID]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[elementID] = updatedFormElement;
        const formValidity = this.checkFormValidity(updatedForm)
        this.setState({form: updatedForm, validForm: formValidity});
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

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        const formData = {
            /*firstName:this.state.form.firstName.value,
            secondName: this.state.form.secondName.value,
            email: this.state.form.email.value,
            phoneNumber: '+94' +this.state.form.phoneNumber.value.substring(1),
            address: this.state.form.address.value,
            nic: this.state.form.nic.value */
        }
        axiosInstance.post('addconductor/' + this.props.uid,formData,
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then( response => {
            console.log(response)
            this.setState({loading:false, success:true})
            
        }).catch( error => {
            console.log("Error")
            if (error.response.status == 500 ||error.response.status == '500')
                this.setState({loading:false, success:true})
            else {
                this.setState({loading:false, error:true})
            }
            
        })
        /*axios Here*/
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }

        const selectElementsArray = [];
        for (let key in this.state.selects) {
            selectElementsArray.push({
                id: key,
                config: this.state.selects[key]
            });
        }

        let inputs = formElementsArray.map(formElement => ( 
            <React.Fragment>
                <Input 
                    key={formElement.id}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)} 
                    errorMsg={formElement.config.errorMessage}
                    label={formElement.config.elementConfig.placeholder} 
                    greyInput={true}  />
                <br />
            </React.Fragment>
        ));

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

        let errorMessage = null;

        if (this.state.error){
            errorMessage = <Alert type="Danger">An account for the Email/Mobile Number already exists</Alert>
        }

        let successMessage = null;

        if (this.state.success){
            successMessage = <Alert type="Success">Conductor created Successfully. Login Details are sent to the conductor Mobile Number</Alert>
        }

        let form = 
        (<div className={"form-signup "+ classes.form} style={{textAlign:'center'}}>
            <h1 className={"h3 mb-3 font-weight-normal"} style={{textAlign: 'center'}} >Add a Bus</h1>
            <Typography variant='subtitle1' style={{paddingLeft:'10px', paddingRight:'10px'}}>Add the given details of the Bus and Send the Request</Typography>
            <br />
            <Divider variant='fullWidth' style={{marginBottom:'12px'}} />
            {errorMessage}
            {successMessage}
            {inputs}
            {selects}
            {/*Select Inputs Here*/}
            <Typography variant='caption' style={{color:'grey', marginBottom:'1px'}}>A request to add the bus will be sent. You will be contacted in order to confirm the Bus Registration</Typography>
            <br />
            <button disabled={!this.state.validForm} className="btn btn-lg btn-primary btn-block">Send Request</button>
        </div>)

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


export default connect(mapStateToProps)(AddBus)
