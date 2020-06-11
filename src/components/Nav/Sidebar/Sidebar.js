import React from 'react'
import NavItem from '../NavItem/NavItem'

import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import InputIcon from '@material-ui/icons/Input';
import PollIcon from '@material-ui/icons/Poll';
import HistoryIcon from '@material-ui/icons/History';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus'
import LoopIcon from '@material-ui/icons/Loop'
import InfoIcon from '@material-ui/icons/Info';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    drawer: {
        position:'relative',
        height: '100%',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.light,
        zIndex:0
    },
    drawerPaper: {
        position:'relative',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.light,
        "&:hover, &:focus": {
            textDecoration: 'none',
        }
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
                    icon: <AirlineSeatReclineNormalIcon fontSize='large' />
                },
                {
                    link:'/passenger/dashboard/getroutes',
                    name:'Find Routes',
                    icon: <FormatListNumberedRtlIcon fontSize='large' />
                },
                {
                    link:'/passenger/dashboard/bookings',
                    name:'My Bookings',
                    icon: <BookmarksIcon fontSize='large' />

                }
            ]
            break;
        case "ADMIN":
            navList = [
                {
                    link:'/admin/dashboard/requests',
                    name:'Owner Requests',
                    icon: <InputIcon fontSize='large' />
                },
                {
                    link:'/admin/dashboard/registerbus',
                    name:'Bus Registration',
                    icon: <DirectionsBusIcon fontSize='large' />
                },
                {
                    link:'/admin/dashboard/analytics',
                    name:'Booking Analytics',
                    icon: <PollIcon fontSize='large' />
                },
                {
                    link:'/admin/dashboard/ownerdetails',
                    name:'Owner Details',
                    icon: <InfoIcon fontSize='large' />
                }
            ]
            break;
        default:
            navList = [
                {
                    link:'/owner/dashboard/addconductor',
                    name:'Add a Conductor',
                    icon: <PersonAddIcon fontSize='large' />
                },
                {
                    link:'/owner/dashboard/addbus',
                    name:'Add a Bus',
                    icon: <DirectionsBusIcon fontSize='large' />
                },
                {
                    link:'/owner/dashboard/addturns',
                    name:'Add Turns',
                    icon: <LoopIcon fontSize='large' />
                },
                {
                    link:'/owner/dashboard/bookings',
                    name:'View Bookings',
                    icon: <BookmarksIcon fontSize='large' />

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