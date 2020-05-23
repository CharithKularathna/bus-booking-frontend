import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    marginTop: '8px',
    marginLeft: '7px'
  },
}));

const DatePicker = (props) => {
  const classes = useStyles();

  return (
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue="2020-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.changed}
        value={props.date}
      />
  );
}

export default DatePicker;