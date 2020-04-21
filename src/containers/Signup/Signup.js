import React, { Component } from 'react'
import classes from './Signup.css'
import Input from '../../components/UI/Input/Input'
import  { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Alert from '../../components/UI/Alert/Alert';
import { Redirect } from 'react-router-dom'

class Signup extends Component {
    state={
        form:{
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
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
                touched: false
            },
            password: {
                elementType: 'input',
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
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
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
                touched: false
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
                touched: false
            }
            
        },
        validForm: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        /*
        if (rules.match) {
            isValid = (this.state.form.password.value.toString() === this.state.form.confirmPassword.value.toString()) && isValid
        }
        */
        return isValid;
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
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)} />

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
        (<form className="form-signup" onSubmit={this.submitHandler}>
            <h1 className={"h3 mb-3 font-weight-normal " + classes.FormTitle}>Sign Up</h1>
            <hr />
            {errorMessage}
            {inputs}
            <button disabled={!this.state.validForm} className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
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