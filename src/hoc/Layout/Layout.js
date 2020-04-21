import React, { Component } from 'react'
import Navbar from '../../components/Nav/Navbar/Navbar'
import Footer from '../../components/Nav/Footer/Footer'
import { connect } from 'react-redux'

class Layout extends Component {
    render() {
        return (
            <div className='Layout'>
                <Navbar isAuthenticated={this.props.isAuthenticated} />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps)(Layout);