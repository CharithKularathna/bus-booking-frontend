import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

const timePicker = (props) => {
  const classes = useStyles();

  return (
      <TextField
        id="time"
        label={props.label}
        type="time"
        value={props.value}
        onChange={props.changed}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
  );
}

export default timePicker;