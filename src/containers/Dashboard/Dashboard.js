import React, { Component } from 'react'
import classes from './Dashboard.css'
import Divider from '@material-ui/core/Divider'

class Dashboard extends Component {
    
    render() {
        return (
                <div className={classes.Dash}>
                   <h3>Welcome to the Dashboard!</h3>
                    <Divider variant='middle' />    
               </div>
            
            
        )
    }
}

export default Dashboard;