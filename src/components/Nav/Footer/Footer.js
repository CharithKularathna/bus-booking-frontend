import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Grid, CardMedia, Typography, Button } from '@material-ui/core'
import Logo from '../../../assets/images/Logo.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {

    },
    footerLogo: {
      height: 140,
      width: 140
    },
    link: {
        "&:hover, &:focus": {
            textDecoration: 'none',
            color: "#F5EE9E"
        }
    }
  });



const footer = (props) => {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Card style={{height:'300px', backgroundColor:"#2D936C"}} >
                <Grid container justify="center" >
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item container justify="center" xs={4}>
                        <CardMedia
                            className={classes.footerLogo}
                            image={Logo}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Typography variant='h5' style={{textTransform:'uppercase'}}>
                        Other Services
                        </Typography>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Button color="secondary" variant="text">
                            <NavLink className={classes.link} to='/owner-signup'>Register as a Bus Owner</NavLink>
                        </Button>
                        <Button color="secondary" variant="text">
                            Contact Us
                        </Button>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Typography color="textSecondary">
                            &copy; Bus Booking Platform
                        </Typography>
                    </Grid>

                </Grid>
                
            </Card>
                    
        </React.Fragment>
    )
}

export default footer;