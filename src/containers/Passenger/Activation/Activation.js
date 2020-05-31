import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Spinner from '../../../components/UI/Spinner/Spinner'
import Alert from '../../../components/UI/Alert/Alert'
import axios from '../../../axiosAuth'
import classes from './Activation.css'

class Activation extends Component {
    state = {
        error: null,
        message: null,
        loading: true
    }

    componentDidMount() {
        const token = {
            token:this.props.match.params.token
        }
        axios.post('activate',token)
        .then(response=>{
            this.setState({loading:false,error:null,message:"Activation Successful"})
        })
        .catch(err =>{
            this.setState({loading:false,error:err.message,message:"Activation Successful"})
        })

    }
    render() {
        let content = <Spinner />
        if (!this.state.loading){
            if(this.state.error !== null){
                content = 
                (<Alert type="Danger" title="Activation Failed">
                    User Account activation failed. This can be due to <strong>invalid token</strong> or the <strong>token being expired.</strong> Please, signup again and try to activate.
                </Alert>)
            }
            else {
                content = 
                    (<Alert type="Success" title="Activation Successful">
                        You have activated the account successfully. Please, sign in to experience our services. <strong>Thank You</strong>
                    </Alert>)
                
                
            }
        } 
        return (
            <React.Fragment>
                <div className={classes.Activation} style={{marginTop:'50px'}}>
                    {content}
                </div>
            </React.Fragment>
            
        )
    }
}

export default Activation;