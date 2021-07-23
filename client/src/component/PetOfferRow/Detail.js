import React from 'react';
import { Typography, Grid } from '@material-ui/core'
import useStyles from './styles';

const Detail = ({ label, value }) => {
    const classes = useStyles();
    return (
        <>
            <Grid item xs={12} md={2}>
                <Typography className={classes.label}>{label}</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Typography className={classes.value}>{value}</Typography>
            </Grid>
        </>
    )
}
export default Detail;