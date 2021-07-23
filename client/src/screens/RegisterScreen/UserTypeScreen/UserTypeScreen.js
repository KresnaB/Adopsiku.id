import React from 'react';
import { Grid,Typography,Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import adopter from '../../../images/Adopter.svg';
import provider from '../../../images/Provider.svg';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

const UserTypeScreen = () =>{
    const classes = useStyles();
    const history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    if (userLogin.userInfo) {
        history.push('/petOffers');
    }

    return(
        <Grid container className="container">
            <Grid item xs={12} sm={6} className={classes.grid} align="center">
                <img className={classes.adopter} src={adopter} alt="memories" height="400"></img>
                <Button className={classes.buttonLeft} component={Link} to="/register/adopter" variant="contained" color="primary">Daftar Sebagai Pengadopsi</Button>
            </Grid>  
            <Grid item xs={12} sm={6} className={classes.grid} align="center">
                <img className={classes.provider} src={provider} alt="memories" height="400"></img>
                <Button className={classes.buttonRight} component={Link} to="/providertype/register" variant="contained" color="primary">Daftar Sebagai Penyedia</Button>
            </Grid>
            <Grid item xs={12} className={classes.auth} >
                <Typography variant="h6" align="center">Sudah punya akun?<Link to="/login" className={classes.space}>Masuk</Link></Typography>
            </Grid>
        </Grid>
    )
}

export default UserTypeScreen;
