import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "@material-ui/core";
import { Mail, Call, LocationOn, Home, Person } from "@material-ui/icons";
import useStyles from "./styles";
import { getProviderPets } from "../../store/actions/petOfferActions";
import PetOffer from "../../component/PetOffer/PetOffer";
import moment from "moment";

const Provider = ({ id }) => {
  const classes = useStyles();
  const providerInfo = useSelector((state) => state.providerPets);
  const { loading, provider, petOffers, error } = providerInfo;
  const dispatch = useDispatch();

  console.log(provider);

  // useEffect(() => {
  //   if(provider === undefined){
  //     dispatch(getProviderPets(id));
  //   }
  // }, [dispatch, id, provider]);

  useEffect(() => {
    if (provider === undefined || provider._id !== id) {
      dispatch(getProviderPets(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : provider ? (
        <>
          <Grid container className={classes.profileContainer}>
            <Grid item lg={2} md={2} sm={12} xs={12} className={classes.grid3}>
              <Avatar
                alt="provider image"
                className={classes.providerAvatar}
                src={provider.imageUrl}
              ></Avatar>
              <Typography variant="h6">{provider.name}</Typography>
              <Typography variant="body1">
                {"Bergabung " +
                  moment(provider.createdAt).format("DD MMM YYYY")}
              </Typography>
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12} className={classes.grid1}>
              <Typography variant="h6" className={classes.title}>
                Informasi umum penyedia hewan
              </Typography>
              <Grid container className={classes.value}>
                <Grid item lg={1} md={1} sm={2} xs={2}>
                  <Mail />
                </Grid>
                <Grid item lg={10} md={10}>
                  <Typography variant="body1">{provider.email}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.value}>
                <Grid item lg={1} md={1} sm={2} xs={2}>
                  <Call />
                </Grid>
                <Grid item lg={10} md={10}>
                  <Typography variant="body1">
                    {provider.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.value}>
                <Grid item lg={1} md={1} sm={2} xs={2}>
                  <LocationOn />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Typography variant="body1">
                    {provider.address.additional +
                      ", " +
                      provider.address.village +
                      ", " +
                      provider.address.district +
                      ", " +
                      provider.address.city +
                      ", " +
                      provider.address.province}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {provider.role === "OrganizationalProvider" ? (
              <Grid
                item
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className={classes.grid1}
              >
                <Typography variant="h6" className={classes.title}>
                  Klinik hewan langganan
                </Typography>
                <Grid container className={classes.value}>
                  <Grid item lg={1} md={1} sm={2} xs={2}>
                    <Home />
                  </Grid>
                  <Grid item lg={10} md={10}>
                    <Typography variant="body1">
                      {provider.veterinarian.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.value}>
                  <Grid item lg={1} md={1} sm={2} xs={2}>
                    <Person />
                  </Grid>
                  <Grid item lg={10} md={10}>
                    <Typography variant="body1">
                      {provider.veterinarian.personInCharge}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.value}>
                  <Grid item lg={1} md={1} sm={2} xs={2}>
                    <LocationOn />
                  </Grid>
                  <Grid item lg={10} md={10}>
                    <Typography variant="body1">
                      {provider.veterinarian.address}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
          <Grid container>
            <Grid className={classes.container} container spacing={1}>
              {petOffers.map((petOffer) => (
                <Grid
                  key={petOffer._id}
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  xl={2}
                >
                  <PetOffer petOffer={petOffer} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default Provider;
