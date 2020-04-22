import React, { Component } from 'react'
import classes from './Dashboard.css'

class Dashboard extends Component {
    
    render() {
        return (
                <div className={classes.Dash}>
                   <h3>Welcome to the Dashboard!</h3>
                    <hr></hr>    
               </div>
            
            
        )
    }
}

export default Dashboard;