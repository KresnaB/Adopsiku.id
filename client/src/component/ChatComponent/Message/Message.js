import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
// import useStyles from './styles';
import { Grid } from '@material-ui/core';
// import { format } from "timeago.js"

const Message = ({ message, own }) => {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={own? "right" : "left"} primary={message.content}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={own? "right" : "left"} secondary={(message.createdAt)}></ListItemText>
                </Grid>
            </Grid>
        </>
    );
}

export default Message;