import React, { Component } from 'react'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import Alert from '../../../components/UI/Alert/Alert';
import Divider from '@material-ui/core/Divider'
import axiosInstance from '../../../axiosAuth'


class AddConductor extends Component {
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
            secondName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Second Name'
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
            },
            address: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid Phone Number'
            },
            address: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'NIC Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10
                },
                valid: false,
                touched: false,
                errorMessage: 'Invalid NIC Number'
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
            phoneNumber: '+94' +this.state.form.phoneNumber.value.substring(1),
            address: this.state.form.address.value
        }
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
        /*
        let errorMessage = null;

        if (this.props.error !== null){
            errorMessage = <Alert type="Danger">An account for the Email/Mobile Number already exists</Alert>
        }

        if (this.props.error === "Request failed with status code 422"){
            errorMessage = <Alert type="Danger">An account for the Email/Mobile Number already exists</Alert>
        }
        */

        let form = 
        (<form className="form-signup" onSubmit={this.submitHandler} style={{textAlign:'left'}}>
            <h1 className={"h3 mb-3 font-weight-normal"} style={{textAlign: 'center'}} >Add a Conductor</h1>
            <Divider variant='fullWidth' style={{marginBottom:'12px'}} />
            {inputs}
            <br />
            <button disabled={!this.state.validForm} className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
        </form>)

        return(
            <div>
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


export default connect(mapStateToProps)(AddConductor)

