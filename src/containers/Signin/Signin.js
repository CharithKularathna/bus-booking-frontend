import React, { Component } from 'react'
import classes from './Signin.css'
import Input from '../../components/UI/Input/Input'
import { Link } from 'react-router-dom';
import  { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Alert from '../../components/UI/Alert/Alert';
import { Redirect } from 'react-router-dom'

class Signin extends Component{
    state = {
        form:{
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
                    minLength: 1,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            
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
        this.props.onSignin(this.state.form.email.value, this.state.form.password.value)
    }


    render() {
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/' />
        }

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
        if (this.props.error) {
            errorMessage = <Alert type="Danger">Invalid Email or Password. Try Again.</Alert>
        }

        let form = (
            <form onSubmit={this.submitHandler} className="form-signin">
                <h1 className={"h3 mb-3 font-weight-normal " + classes.FormTitle}>Sign In</h1>
                <hr />
                {errorMessage}
                {inputs}
                <p>Don't have an Account?</p>
                <Link to="signup">Create an Account</Link>
                <button disabled={!this.state.validForm} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>)
        
        
        if (this.props.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.Signin}>
                {authRedirect}
                {form}
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return{
        onSignin: (email,password) => dispatch(actions.signin(email,password)),
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.signin.loading,
        error: state.signin.error,
        isAuthenticated: state.signin.token !== null
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signin);