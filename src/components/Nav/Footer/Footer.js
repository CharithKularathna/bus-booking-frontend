import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Footer.css'
import { Card, Grid, CardMedia, Typography } from '@material-ui/core'
import { grey, blueGrey } from '@material-ui/core/colors'
import Logo from '../../../assets/images/Logo.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
      backgroundColor: blueGrey['400'],
    },
    footerLogo: {
      height: 140,
      width: 140
    },
  });



const footer = (props) => {
    const msClasses = useStyles();

    return(
    <React.Fragment>
        <Card className={classes.Footer} style={{height:'300px'}} >
            <Grid container justify="center" >
                <Grid item xs={4}>

                </Grid>
                <Grid item container justify="center" xs={4}>
                    <CardMedia
                        className={msClasses.footerLogo}
                        image={Logo}
                    />
                </Grid>
                <Grid item xs={4}>
                    
                </Grid>
                <Typography>
                    Hi, I am the footer
                </Typography>
            </Grid>
            
        </Card>
                    {/*
                    <br /><NavLink to='/owner-signup'>Register as a Bus Owner</NavLink>
                    <br /><NavLink to='/'>Inquiries</NavLink>
                    <br /><NavLink to='/'>Careers</NavLink>
                    <br /><br /><strong>Contact Us</strong>
                    */ }
                    
    </React.Fragment>
    )
}

export default footer;