import React from 'react'
import logo from '../../../assets/images/Logo.png'
import { NavLink } from 'react-router-dom'
import classes from './Footer.css'
import { Paper } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const footer = (props) => (
    <React.Fragment>
        <footer>
            <Paper elevation={2} style={{height:'300px', background:grey}}/>
        </footer>
                    {/*
                    <br /><NavLink to='/owner-signup'>Register as a Bus Owner</NavLink>
                    <br /><NavLink to='/'>Inquiries</NavLink>
                    <br /><NavLink to='/'>Careers</NavLink>
                    <br /><br /><strong>Contact Us</strong>
                    */ }
                    
    </React.Fragment>
)

export default footer;