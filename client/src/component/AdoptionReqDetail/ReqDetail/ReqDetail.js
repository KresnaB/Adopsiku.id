import React from 'react';
import { Typography, Grid } from '@material-ui/core'

import useStyles from './styles';
const ReqDetail = ({ label, value }) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <Typography className={classes.label}>{label}</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Typography className={classes.value}>{value? value : '-'}</Typography>
            </Grid>
        </Grid>
    )
}
export default ReqDetail;