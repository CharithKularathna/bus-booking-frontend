import React, { Component } from 'react'

import Navbar from '../../components/Nav/Navbar/Navbar'
import Sidebar from '../../components/Nav/Sidebar/Sidebar'
import Footer from '../../components/Nav/Footer/Footer'
import { Grid, Paper } from '@material-ui/core'

import { connect } from 'react-redux'

class Layout extends Component {
    render() {
        return (
            <Grid container justify="center" spacing={1}>
                <Grid item>
                    <Navbar isAuthenticated={this.props.isAuthenticated} />
                </Grid>
                {this.props.isAuthenticated ? 
                    <Grid container style={{marginTop:'50px'}}>
                        <Grid item xs={2} >
                            <Sidebar name={this.props.userName} role={this.props.role}/>
                        </Grid>
                        <Grid item container justify="center" xs={10}>
                            {this.props.children}
                        </Grid> 
                    </Grid> : this.props.children

                }
                <Grid item xs={12}>
                    <Footer />
                </Grid>
                    
            </Grid>
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