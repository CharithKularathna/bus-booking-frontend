import React, { Component } from 'react'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import Alert from '../../../components/UI/Alert/Alert';
import Divider from '@material-ui/core/Divider'
import axiosInstance from '../../../axiosAuth'
import classes from './AddConductor.css'
import Typography  from '@material-ui/core/Typography';
import Spinner from '../../../components/UI/Spinner/Spinner'
import { validateForm } from '../../../store/validate'

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
            nic: {
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
        validForm: false,
        error: false,
        loading: false,
        success: false
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
        this.setState({loading:true})
        const formData = {
            firstName:this.state.form.firstName.value,
            secondName: this.state.form.secondName.value,
            email: this.state.form.email.value,
            phoneNumber: '+94' +this.state.form.phoneNumber.value.substring(1),
            address: this.state.form.address.value,
            nic: this.state.form.nic.value
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

        let errorMessage = null;

        if (this.state.error){
            errorMessage = <Alert type="Danger">An account for the Email/Mobile Number already exists</Alert>
        }

        let successMessage = null;

        if (this.state.success){
            successMessage = <Alert type="Success">Conductor created Successfully. Login Details are sent to the conductor Mobile Number</Alert>
        }

        let form = 
        (<form className={"form-signup "+ classes.form} onSubmit={this.submitHandler} style={{textAlign:'center'}}>
            <h1 className={"h3 mb-3 font-weight-normal"} style={{textAlign: 'center'}} >Add a Conductor</h1>
            <Typography variant='subtitle1' style={{paddingLeft:'10px', paddingRight:'10px'}}>Add the given details of the Conductor and Submit</Typography>
            <br />
            <Divider variant='fullWidth' style={{marginBottom:'12px'}} />
            {errorMessage}
            {successMessage}
            {inputs}
            <Typography variant='caption' style={{color:'grey', marginBottom:'1px'}}>Note that the User added will be given the right to access Details and Seat Reservations of the Buses that are currently registered under you.</Typography>
            <br />
            <button disabled={!this.state.validForm} className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
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


export default connect(mapStateToProps)(AddConductor)

