import React from 'react'
import classes from './Navbar.css'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/images/Logo.png'

const navbar = (props) => {
    const styleArray = ['navbar','navbar-expand', 'fixed-top', classes.Navbar]
    const logoutLink = (props.isAuthenticated) ? <li className={'nav-item'}>
    <NavLink activeClassName={classes.active} className='nav-link logout-link' exact to='/logout'>Logout</NavLink>
</li> : null;
    return (
        <React.Fragment>
            <nav className={styleArray.join(" ")}>
                <div className='navbar-brand'><img src={logo}></img></div>
                <ul className='navbar-nav'>
                    <li className={'nav-item'}>
                        <NavLink activeClassName={classes.active} className='nav-link' exact to='/'>Home</NavLink>
                    </li>
                    {(!props.isAuthenticated) ? <li className={'nav-item'}>
                        <NavLink activeClassName={classes.active} className='nav-link' exact to='/schedule'>Bus Schedule</NavLink>
                    </li> : null}
                    <li className={'nav-item'}>
                        <NavLink activeClassName={classes.active} className='nav-link' exact to='/about'>About Us</NavLink>
                    </li>
                    {logoutLink}
                </ul>
            </nav>
        </React.Fragment>
    )

}
    
    


export default navbar;