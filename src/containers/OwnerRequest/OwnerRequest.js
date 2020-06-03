import React,{ Component } from 'react'
import classes from './OwnerRequest.css'
import Input from '../../components/UI/Input/Input'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Alert from '../../components/UI/Alert/Alert'
import axios from '../../axiosAuth'
import Spinner from '../../components/UI/Spinner/Spinner'
import { phoneNumberFormatter } from '../../store/utility'
import { validateForm } from '../../store/validate'

class OwnerRequest extends Component{
    state = {
        form:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: "Please enter a name"
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                errorMessage: "Invalid Phone Number. Use a number with 10 digits of length"
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: "Invalid Address"
            }
            
        },
        validForm: false,
        loading: false,
        error: false,
        message: false,
    }

    checkValidity(value, rules) {
        const validation = validateForm(value, rules)
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

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        const formData = {
            name: this.state.form.name.value,
            phoneNumber: phoneNumberFormatter(this.state.form.phoneNumber.value),
            address:this.state.form.address.value
        }
        axios.post('/sendrequest',formData)
        .then(response=>{
            this.setState({message:true,error:false,loading:false})
        })
        .catch(err => {
            this.setState({message:false,error:true,loading:false})
        })
        //this.props.history.push('/');
    }

    
    render(){
        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }
        let inputs = formElementsArray.map(formElement => (
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
             />
        ));
        
        return(
            <div className={classes.OwnerRequest}>
            {!this.state.loading ?
            (<form onSubmit={this.submitHandler} className="form-signin">
                <h1 className={"h3 mb-3 font-weight-normal " + classes.FormTitle}>Request Registration</h1>
                <p>Enter the Details below and an Admin will contact you for further information</p>
                <hr />
                {this.state.message ? <Alert type="Success">Request Sent Successfully!</Alert> : null}
                {this.state.error ? <Alert type="Danger">Sending Failed! Try Again.</Alert> : null}
                {inputs}
                <button disabled={!this.state.validForm} className="btn btn-lg btn-primary btn-block" type="submit">Send Request</button>
            </form>) : <Spinner />
            }
            </div>
        )
    }
}

export default OwnerRequest;