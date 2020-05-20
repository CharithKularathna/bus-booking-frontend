import React from 'react'
import classes from './Sidebar.css'
import NavItem from '../NavItem/NavItem'
import avatarImage from '../../../assets/images/avatar.png'

const sidebar = (props) => {
    let navList = null;
    switch (props.role) {
        case "PASSENGER":
            navList = [
                {
                    link:'/passenger/dashboard/reserve',
                    name:'Reserve a Seat'
                },
                {
                    link:'/passenger/dashboard/schedule',
                    name:'Bus Schedule'
                },
                {
                    link:'/passenger/dashboard/bookings',
                    name:'My Bookings'
                }
            ]
            break;
        case "ADMIN":
            navList = [
                {
                    link:'/admin/dashboard/requests',
                    name:'Owner Requests'
                },
                {
                    link:'/admin/dashboard/analytics',
                    name:'Booking Analytics'
                },
                {
                    link:'/admin/dashboard/bookings',
                    name:'Approval History'
                }
            ]
            break;
        default:
            navList = [
                {
                    link:'/owner/dashboard/addconductor',
                    name:'Add a Conductor'
                },
                {
                    link:'/owner/dashboard/bookings',
                    name:'Booking History'
                }
            ]
            break;

    }
    let navItems = navList.map(nav => (
        <NavItem
            key={nav.name}
            name={nav.name}
            link={nav.link}
        />
    ));

    return (
        <div className={classes.Sidebar} >
            <img src={avatarImage} />
            <p><b>{props.name}</b></p>
            <ul className={classes.SidebarNav}>
                {navItems}
            </ul>
        </div>
    )
}

export default sidebar;