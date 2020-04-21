import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from '../../components/UI/Slider/Slider'
import { Redirect } from 'react-router';


class Home extends Component {
    render() {
        let authRedirect = null;
        if (this.props.role !== null){
            const roleName = this.props.role.toLowerCase()
            authRedirect = <Redirect to={'/'+ roleName + '/dashboard'}/>
        }
        return (
            <React.Fragment>
                <div>
                    {authRedirect}
                    <Slider />
                </div>
            {/*
                <header className="w3-container w3-center" style={padding:128px 16px; background-image:url(./main3.jpg); background-position: top; background-color: #fdfffc; background-repeat: no-repeat; background-attachment: fixed;}>
                <h1 className="w3-margin w3-jumbo" style={color: #f5ee9e} >Transport</h1> 
                <p className="w3-xlarge" style={color: #f5ee9e}>With you for easy and convenient travel</p>
                <a className="w3-button w3-padding-large w3-large w3-margin-top" style="background-color: #2d936c; color: #fdfffc;" href="" >I am a Passenger</a>
                <a className="w3-button w3-padding-large w3-large w3-margin-top" style="background-color: #2d936c; color: #fdfffc;" href="">I am a Bus Owner</a>
                </header>
                
                
                <div className="w3-row-padding w3-padding-64 w3-container">
                    <div className="w3-content">
                        <div className="w3-twothird">
                            <h1>Reserve Your Seat</h1>
                            <h5 className="w3-padding-32" style="align-content: flex-start" >Creating a Transport account gives you the chance to reserve your seat in a bus so that, you don't have to worry about not having a seat anymore.</h5>
                    
                        </div>
                    
                        <div className="w3-third w3-center">
                            <img src="./buslogo.jpg" height="300px" width="300px" />
                        </div>
                    </div>
                </div>
                
                
                <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
                    <div className="w3-content">
                        <div className="w3-third w3-center">
                            <img src="./schedule.png" height="300px" width="300px" />
                        </div>
                    
                        <div className="w3-twothird">
                            <h1>Know the Bus Schedule</h1>
                            <h5 className="w3-padding-32">TransMax allows you to check the bus schedule of your travel route and check the availability of Buses using your mobile.</h5>
                        </div>
                    </div>
                </div>
            */}
            </React.Fragment>
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        role: state.signin.role
    }
}

export default connect(mapStateToProps)(Home);