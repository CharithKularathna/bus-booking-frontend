import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    //marginLeft: theme.spacing(1),
    //marginRight: theme.spacing(1),
    margin: theme.spacing(1),
    width: '100%',
  },
}));

const datePicker = (props) => {
  const classes = useStyles();
  return (
      <TextField
        id="date"
        label={props.label}
        type="date"
        value={props.value}
        onChange={props.changed}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
  );
}

export default datePicker;
