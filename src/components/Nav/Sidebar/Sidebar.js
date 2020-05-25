import React from 'react'
import NavItem from '../NavItem/NavItem'
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import InputIcon from '@material-ui/icons/Input';
import PollIcon from '@material-ui/icons/Poll';
import HistoryIcon from '@material-ui/icons/History';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    drawer: {
        position:'relative',
        height: '100%'
      
    },
    drawerPaper: {
        position:'relative'
    },
    
  }));

const sidebar = (props) => {
    const classes = useStyles();
    let navList = null;
    switch (props.role) {
        case "PASSENGER":
            navList = [
                {
                    link:'/passenger/dashboard/reserve',
                    name:'Reserve a Seat',
                    icon: <AirlineSeatReclineNormalIcon />
                },
                {
                    link:'/passenger/dashboard/schedule',
                    name:'Bus Schedule',
                    icon: <DateRangeIcon />
                },
                {
                    link:'/passenger/dashboard/bookings',
                    name:'My Bookings',
                    icon: <BookmarksIcon />

                }
            ]
            break;
        case "ADMIN":
            navList = [
                {
                    link:'/admin/dashboard/requests',
                    name:'Owner Requests',
                    icon: <InputIcon />
                },
                {
                    link:'/admin/dashboard/analytics',
                    name:'Booking Analytics',
                    icon: <PollIcon />
                },
                {
                    link:'/admin/dashboard/bookings',
                    name:'Approval History',
                    icon: <HistoryIcon />
                }
            ]
            break;
        default:
            navList = [
                {
                    link:'/owner/dashboard/addconductor',
                    name:'Add a Conductor',
                    icon: <PersonAddIcon />
                },
                {
                    link:'/owner/dashboard/bookings',
                    name:'Booking History',
                    icon: <HistoryIcon />
                }
            ]
            break;
    }
    return(
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
        paper: classes.drawerPaper,
        }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {
                        navList.map(item => (
                            <NavItem
                                key={item.name}
                                name={item.name}
                                link={item.link}>
                                {item.icon}
                            </NavItem>
                        ))
                    }
                </List>
            </div>
        </Drawer>
        
        
   )
}

export default sidebar;