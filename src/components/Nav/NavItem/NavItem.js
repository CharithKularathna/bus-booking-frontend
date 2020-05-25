import React from 'react'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const navItem = (props) => {
    return (
        <Link to={props.link} >
            <ListItem button key={props.name}>
                <ListItemIcon>{props.children}</ListItemIcon>
                <ListItemText primary={props.name} />
            </ListItem>
        </Link>
            
    )
}

export default navItem;