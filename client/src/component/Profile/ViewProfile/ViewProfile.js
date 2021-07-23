import React, { useEffect } from 'react'
import { CircularProgress, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { viewProfile } from '../../../store/actions/userActions';
import ViewProfileData from './ViewProfileData';
import ViewOrg from './ViewOrg';
import useStyles from './styles'

const ViewProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogin.userInfo);
    const profile = useSelector(state => state.userProfile);
    const classes = useStyles();

    useEffect(() => {
        dispatch(viewProfile(user.id));
    }, [dispatch, user])

    return (
        <Container component="main" maxWidth="md">
            {profile.loading === true? 
                <div className={classes.loading}>
                    <CircularProgress /> 
                </div>
                :
                ((Object.keys(profile).length !== 0 && user.role === "OrganizationalProvider") ? 
                (<ViewOrg />) 
                : ((Object.keys(profile).length !== 0 && user.role !== "OrganizationalProvider") ? 
                (<ViewProfileData />) 
                : null )
                )
            }  
        </Container>
    )
}

export default ViewProfile;