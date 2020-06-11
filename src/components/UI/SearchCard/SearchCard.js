import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme)=>({
    root: {
      width: '90%',
      marginTop: '10px',
      marginBottom: '10px',
      borderRadius: '5px'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
    button: {
        marginLeft:'90%'
    },
    fromTitle: {
        color: theme.palette.secondary.dark
    },
    toTitle: {
        color: theme.palette.secondary.dark
    }
  }))

const searchCard = (props) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return(
        <React.Fragment>
            <Card className={classes.root}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item sm={6} >
                            <Typography variant="h5" component="h2" className={classes.fromTitle}>
                                <strong>From</strong> - {props.from} 
                            </Typography>
                        </Grid>
                        <Grid item sm={6} >
                            <Typography variant="h5" component="h2" className={classes.toTitle}>
                                <strong>To</strong> - {props.to}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item sm={6} >
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {bull}Date - {props.date}
                            </Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {bull}Departure - {props.departure}
                            </Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {bull}Arrival - {props.arrival}
                            </Typography>
                        </Grid>
                        <Grid item sm={6} >
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {bull}Bus Number - {props.busNumber}
                            </Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {bull}Seat Arrangement - {props.seatArrangement}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} variant='contained' color='primary' onClick={props.clicked}>Reserve Seats</Button>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}

export default searchCard;