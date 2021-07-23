// import React, { useEffect,useState } from 'react'
// import { Grid, Typography, Paper, Button } from '@material-ui/core';
// import { useDispatch, useSelector } from 'react-redux';
// import useStyles from './styles';
// import { Link } from 'react-router-dom';
// import { Skeleton, Alert } from '@material-ui/lab';
// import MyPetOffer from '../../../component/MyPetOffer/MyPetOffer';
// import { userPetOffers, deletePetOffer, updateStatus } from '../../../store/actions/petOfferActions';
// import { CircularProgress, Container, LinearProgress } from '@material-ui/core';

// const PetListScreen = () => {
//     const dispatch = useDispatch();
//     const classes = useStyles();
//     const [deleteOffer, setDeleteOffer] = useState(null);
//     const [changeStatus, setChangeStatus] = useState(null);

//     const petOfferList = useSelector((state) => state.userPetOfferList)
//     const { loading, error, petOffers, componentLoading } = petOfferList

//     console.log(petOffers)

//     let compLoading = false;
//     if(componentLoading){
//         compLoading = componentLoading;
//     }else{
//         compLoading = false;
//     }

//     const userLogin = useSelector((state) => state.userLogin)
//     const { userInfo } = userLogin

//     useEffect(() => {
//         if(deleteOffer){
//             dispatch(deletePetOffer(userInfo.id, deleteOffer));
//             setDeleteOffer(null);
//         }
//         if(changeStatus){
//             const data = { status: changeStatus.status};
//             dispatch(updateStatus(changeStatus.id, data));
//         }
//     }, [dispatch, deleteOffer, userInfo, changeStatus]);

    
//     useEffect(() => {
//       dispatch(userPetOffers(userInfo.id));
//     }, [dispatch, userInfo]);
  
//     return (
//         <>
//             <Grid container className={classes.container}>
//                <Grid item xs={12} className={classes.title}>
//                    <Typography variant="h5" className={classes.titleText}>Daftar Penawaran Hewan</Typography>
//                    <Button className={classes.button} component={Link} to="/dashboard/pet/create" variant="contained" color="primary" fontWeight="fontWeightBold">+&nbsp;Penawaran</Button>
//                </Grid>
//                <Grid item xs={12} component={Paper} className={classes.item2}>
//                     <Grid container>
//                         <Grid item xs={12} className={classes.rowTitle}>
//                             <Typography className={classes.label} align="center">Info Hewan</Typography>
//                             <Typography  className={classes.text2} variant="h6">Status</Typography>
//                             <Typography className={classes.text3} variant="h6">Aksi</Typography>
//                         </Grid>
//                         {loading ?
//                         (
//                             <div className={classes.loading}>
//                                 <CircularProgress /> 
//                             </div> 
//                         )
//                         : error ? ( <Alert severity="error">{error}</Alert> )
//                         : (
//                             <>
//                                 {petOffers.map((petOffer) => (
//                                     <Grid key={petOffer._id} item xs={12} className={classes.myPetOffer}>
//                                         <MyPetOffer petOffer={petOffer} setDeleteOffer={setDeleteOffer} setChangeStatus={setChangeStatus} compLoading={compLoading}/>
//                                     </Grid>
//                                 ))}
//                             </>
//                             )
//                         }
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </>
//     )
// }

// export default PetListScreen;