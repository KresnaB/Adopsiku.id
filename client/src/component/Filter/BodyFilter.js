import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import useStyles from './styles';

const BodyFilter = ({ item, handleChange, checked }) => {

    const classes = useStyles();
    
    return(
        <ListItem key={item}>
            <ListItemText id={item} primary={item} />
            <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={handleChange}
                    checked={checked}
                />
            </ListItemSecondaryAction>
        </ListItem>
)}

export default BodyFilter;