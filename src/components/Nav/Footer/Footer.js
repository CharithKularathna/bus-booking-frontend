import React from 'react'
import logo from '../../../assets/images/Logo.png'
import { NavLink } from 'react-router-dom'
import classes from './Footer.css'

const footer = (props) => (
    <React.Fragment>
        <footer className={classes.Footer}>
            <div className="row justify-content-center">
                <div className={"col-md-5 col-sm-6 " + classes.Image}>
                    <img src={logo} />
                </div>
                <div className={"col-md-3 col-sm-3 "+ classes.FooterText} > 
                    <h4>Other Services</h4>
                    <br /><NavLink to='/owner-signup'>Register as a Bus Owner</NavLink>
                    <br /><NavLink to='/'>Inquiries</NavLink>
                    <br /><NavLink to='/'>Careers</NavLink>
                    <br /><br /><strong>Contact Us</strong>
                    <p>(+94)71 12344556<br />info@busbooking.com</p>
                </div>
                <hr className={classes.Socket}></hr>
            </div>
            <div className="row justify-content-center">
                <div className={"col " + classes.FinalText}>
                    <p>&copy; Bus Booking Platfrom</p>
                </div>
            </div>
            
        </footer>
    </React.Fragment>
)

export default footer;