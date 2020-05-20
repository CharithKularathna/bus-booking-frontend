import React, { Component } from 'react'

import Navbar from '../../components/Nav/Navbar/Navbar'
import Sidebar from '../../components/Nav/Sidebar/Sidebar'
import Footer from '../../components/Nav/Footer/Footer'
import { Grid } from '@material-ui/core'

import { connect } from 'react-redux'

class Layout extends Component {
    render() {
        return (
            <div className='Layout'>
                <Grid container >
                    <Navbar isAuthenticated={this.props.isAuthenticated} />
                </Grid>
                {this.props.isAuthenticated ? 
                    <Grid container>
                        <Grid container item xs={3}>
                            <Sidebar name={this.props.userName} role={this.props.role}/>
                        </Grid>
                        <Grid container item xs={9}>
                            {this.props.children}
                        </Grid> 
                    </Grid> : this.props.children

                }
                <Grid container item lg={12} xs={12}>
                    <Footer />
                </Grid>
                    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.signin.token !== null,
        role: state.signin.role,
        userName: state.signin.name
    }
}

export default connect(mapStateToProps)(Layout);