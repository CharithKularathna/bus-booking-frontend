import React, { Component } from 'react'
import Navbar from '../../components/Nav/Navbar/Navbar'
import Sidebar from '../../components/Nav/Sidebar/Sidebar'
import Footer from '../../components/Nav/Footer/Footer'
import { connect } from 'react-redux'

class Layout extends Component {
    render() {
        return (
            <div className='Layout'>
                <Navbar isAuthenticated={this.props.isAuthenticated} />
                {this.props.isAuthenticated ? <Sidebar role={this.props.role}/> : null}
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.signin.token !== null,
        role: state.signin.role
    }
}

export default connect(mapStateToProps)(Layout);