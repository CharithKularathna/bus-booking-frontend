import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Navbar from '../../components/Nav/Navbar/Navbar'
import Sidebar from '../../components/Nav/Sidebar/Sidebar'
import Footer from '../../components/Nav/Footer/Footer'
import { Grid, Paper } from '@material-ui/core'

import { connect } from 'react-redux'

const styles = theme => ({
    container: {
        minHeight: '100vh'
    }
})

class Layout extends Component {
    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="center" spacing={1}>
                <Grid item>
                    <Navbar isAuthenticated={this.props.isAuthenticated} />
                </Grid>
                {this.props.isAuthenticated ? 
                    <Grid container style={{marginTop:'47px'}} className={classes.container}>
                        <Grid item xs={2} >
                            <Sidebar name={this.props.userName} role={this.props.role}/>
                        </Grid>
                        <Grid item container justify="center" xs={10} className={classes.container}>
                            {this.props.children}
                        </Grid> 
                    </Grid> :
                    <Grid item xs={12}>
                        {this.props.children}
                    </Grid>
                     

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

export default connect(mapStateToProps)(withStyles(styles)(Layout));