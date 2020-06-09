import React from 'react';
import {  FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=>({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        textAlign: 'left'
    }


}))

let reserveSelect;
export default reserveSelect = (props) => {

    const classes = useStyles();

    const menuItems= props.options.map(city => (
        <MenuItem key={city} value={city.toLowerCase()}>{city}</MenuItem>
    ))

    return (
        <FormControl className={classes.formControl} error={props.isError}>
            <InputLabel shrink id="inputSelect">
                {props.label}
            </InputLabel>
            <Select
                labelId="startSelect"
                id="startSelect"
                value={props.value}
                onChange={props.changeHandler}
                displayEmpty
                className={classes.selectEmpty}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {menuItems}
            </Select>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    )
}