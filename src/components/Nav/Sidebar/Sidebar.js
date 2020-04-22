import React from 'react'
import classes from './Sidebar.css'
import NavItem from '../NavItem/NavItem'

const sidebar = (props) => {
    //let navItems = props.items.map();
    return (
        <div className={classes.Sidebar + ' sidebar-wrapper'} >
            <ul className={classes.SidebarNav}>
                <NavItem link={'#'} name={'Name'}/>
                <NavItem link={'#'} name={'Name'}/>
                <NavItem link={'#'} name={'Name'}/>  
            </ul>
        </div>
    )
}

export default sidebar;