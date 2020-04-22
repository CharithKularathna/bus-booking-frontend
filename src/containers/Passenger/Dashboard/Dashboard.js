import React, { Component } from 'react'
import Content from './DashBoardContent/DashboardContent'
import Sidebar from '../../../components/Nav/Sidebar/Sidebar';
import classes from './Dashboard.css'

class Dashboard extends Component {
    componentDidMount(){
        const script = document.createElement('script')
        script.src = "SidebarScript.js"
        script.async = true;

        document.body.appendChild(script)
    }
    
    render() {
        return (
                <div id='wrapper' className={classes.Dash}>
                    <div className='row'>
                        <div className='col=lg-2 col-md-4'>
                            <Sidebar />
                        </div>
                        <div className='col=lg-10 col-md-8'>
                            <Content />
                        </div>
                    </div>
                    
                    
                </div>
            
            
        )
    }
}

export default Dashboard;