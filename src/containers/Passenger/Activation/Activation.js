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
                content = <Alert type="Danger">{this.state.error}</Alert>
            }
            else {
                content = 
                <div>
                    <Alert type="Success">{this.state.message}</Alert>
                    <Link to='/signin'>Proceed to Sign in</Link>
                </div>
                
            }
        } 
        return (
            <React.Fragment>
                <div className={classes.Activation}>
                    {content}
                </div>
            </React.Fragment>
            
        )
    }
}

export default Activation;