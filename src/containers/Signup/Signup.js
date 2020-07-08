import React, { Component } from 'react'
import classes from './Signup.css'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Alert from '../../components/UI/Alert/Alert';
import { Redirect } from 'react-router-dom'
import { stringCapitalize } from '../../store/utility'
import Divider from '@material-ui/core/Divider'
import { validateForm } from '../../store/validate'

class Signup extends Component {
    state={
        form:{
            firstName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Name'


            },
            lastName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Name'
            },
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Email Address'
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 20
                },
                valid: false,
                touched: false,
                errorMessage: 'Password should be at least 6 characters long'
            },
            confirmPassword: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    match:true
                },
                valid: false,
                touched: false,
                errorMessage: "Doesn't match with the Password"
            },
            phoneNumber: {
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
                errorMessage: 'Invalid Phone Number'
            }
            
        },
        validForm: false
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

    submitHandler = (event) => {
        event.preventDefault();
        const formData = {
            firstName:this.state.form.firstName.value,
            secondName: this.state.form.lastName.value,
            email: this.state.form.email.value,
            password: this.state.form.password.value,
            phoneNumber: '+94' +this.state.form.phoneNumber.value.substring(1),
            role: "PASSENGER"
        }
        this.props.onSubmit(formData)
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
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
                    label={formElement.config.elementConfig.placeholder} />
                <br />
            </React.Fragment>
        ));
        let errorMessage = null;

        if (this.props.error !== null){
            errorMessage = <Alert type="Danger">{this.props.error}</Alert>
        }

        if (this.props.error === "Request failed with status code 422"){
            errorMessage = <Alert type="Danger">An account for the Email already exists</Alert>
        }

        let successRedirect = null;
        if (this.props.message !== null){
            successRedirect = <Redirect to='/signupsuccess'/>
        }

        let form = 
        (<form className="form-signup" onSubmit={this.submitHandler} style={{textAlign:'left'}}>
            <h1 className={"h3 mb-3 font-weight-normal " + classes.FormTitle}>Sign Up</h1>
            <Divider variant='fullWidth' style={{marginBottom:'12px'}} />
            {errorMessage}
            {inputs}
            <br />
            <p><b>By Signing up you agree to the Terms and Conditions of BusBooking</b></p>
            <br />
            <button className={classes.bb} disabled={!this.state.validForm} className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
        </form>)

        if (this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.Signup}>
                {successRedirect}
                {form}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        loading: state.signup.loading,
        message: state.signup.message,
        error: state.signup.error,
        isAuthenticated: state.signin.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSubmit: (formData) => dispatch(actions.signup(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);