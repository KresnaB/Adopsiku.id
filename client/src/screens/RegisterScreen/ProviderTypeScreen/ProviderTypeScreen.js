import React from 'react';
import { Grid,Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import individual from '../../../images/Individual.svg';
import organization from '../../../images/Organization.svg';
import useStyles from './styles';

const ProviderTypeScreen = () =>{
    const classes = useStyles();
    const history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    if (userLogin.userInfo) {
        history.push('/petOffers');
    }

    return(
        <Grid container className="container">
            <Grid item xs={12} className={classes.title} >
                <Typography variant="h4" align="center">Pilih Tipe Penyedia</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.grid} align="center">
                <Link to="/register/individual"><img className={classes.imageIndividual} src={individual} alt="memories" height="400"></img></Link>
            </Grid>  
            <Grid item xs={12} sm={6} className={classes.grid} align="center">
                <Link to="/register/organization"><img className={classes.imageOrganization} src={organization} alt="memories" height="400"></img></Link>
            </Grid>
        </Grid>
    )
}

export default ProviderTypeScreen;
