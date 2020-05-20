import React from 'react'
import classes from './Sidebar.css'
import NavItem from '../NavItem/NavItem'
import avatarImage from '../../../assets/images/avatar.png'
import { Paper } from '@material-ui/core'

const sidebar = (props) => {
   return(
       <Paper className={classes.Sidebar}>
            I am the SideBar
       </Paper>
   )
}

export default sidebar;