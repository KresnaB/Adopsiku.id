import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import Relationship from '../../images/Relationship.svg';

const Landing = () =>{
    const classes = useStyles();
    return(
        <Grid container alignItems="strecth">
            <Grid item xs={12} sm={6} className={classes.grid} align="center">
                <img className={classes.image} src={Relationship} alt="memories"></img>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.grid} align="center">
                <Typography variant="h4" className={classes.quote}>
                Situs adopsi hewan yang membantu hewan peliharaanmu menemukan rumah barunya.
                </Typography>
                <Button className={classes.button} component={Link} to="/search" variant="contained" color="primary">Cari Sekarang</Button>
            </Grid>
            
        </Grid>
    )
}

export default Landing