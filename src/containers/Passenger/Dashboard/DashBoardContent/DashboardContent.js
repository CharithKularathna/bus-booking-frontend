import React, { Component } from 'react'
import classes from './DashboardContent.css'

class DashboardContent extends Component {
    render() {
        return (
            <React.Fragment>
            {/*
                Schedule HERE
            */}
                <div className={classes.Content} id="page-content-wrapper">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <a href='#' className='btn btn-success' id='menu-toggle'>Toggle Menu</a>
                                <h3>Dashboard</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}

export default DashboardContent;