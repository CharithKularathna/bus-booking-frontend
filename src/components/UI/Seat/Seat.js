import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  selected: {
    width: "55px",
    height: "55px",
    backgroundColor: "lightblue"
  },
  available: {
    width: "55px",
    height: "55px",
    backgroundColor: theme.palette.primary.light
  },
  unavailble: {
    width: "55px",
    height: "55px",
    backgroundColor: "lightgrey"
  },
  blank: {
    width: "55px",
    height: "55px",
    background: "transparent",
    border: "transparent",
    boxShadow: '0px',
  }
}));

const seat = props => {
    const classes = useStyles();
    let seat = null
    if (props.type == "Blank"){
        seat = (<Button variant="contained" className={classes.blank} disabled>
            
        </Button>)
    }
    else if (props.type == "Available"){
        seat =(<Button variant="contained" className={classes.available} onClick={(event)=>props.clicked(event,props.id)}>
            {props.id}
        </Button>)

    }
    else if (props.type == "Unavailable"){
        seat =(<Button variant="contained" className={classes.unavailble} disabled>
            {props.id}
        </Button>)
    }
    else if (props.type == "Selected"){
        seat = (<Button variant="contained" className={classes.selected} onClick={(event)=>props.clicked(event,props.id)}>
            {props.id}
        </Button>)
    }
    return (
        <React.Fragment>
            {seat}
        </React.Fragment> 
    )
}

export default seat;
