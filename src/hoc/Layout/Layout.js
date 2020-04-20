import React, { Component } from 'react'
import Navbar from '../../components/Nav/Navbar/Navbar'
import Footer from '../../components/Nav/Footer/Footer'

class Layout extends Component {
    render() {
        return (
            <div className='Layout'>
                <Navbar />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default Layout;