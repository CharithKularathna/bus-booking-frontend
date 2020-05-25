import React from 'react'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    text: {
        "&:hover, &:focus": {
            textDecoration: 'none',
            color: theme.palette.secondary.main
        }
    }
}))

const navItem = (props) => {
    const classes = useStyles();
    return (
        <Link to={props.link} style={{textDecoration:'none'}}>
            <ListItem button key={props.name} className={classes.text} >
                <ListItemIcon>{props.children}</ListItemIcon>
                <ListItemText primary={props.name} />
            </ListItem>
        </Link>
            
    )
}

export default navItem;