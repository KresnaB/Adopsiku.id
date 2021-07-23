import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { providerDetail } from "../../store/actions/userActions";
import {
  Avatar,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import useStyles from "./styles";
import { getProviderPets } from "../../store/actions/petOfferActions";
import PetOffer from "../../component/PetOffer/PetOffer";

const Provider = ({ id }) => {
  const classes = useStyles();
  const providerInfo = useSelector((state) => state.providerPets);
  const { loading, provider, petOffers, totalPage, error } = providerInfo;
  const dispatch = useDispatch();

  console.log(loading)

  useEffect(() => {
    if(provider === undefined){
      dispatch(getProviderPets(id));
    }
  }, [dispatch, id, provider]);

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : provider?(
        <Grid container>
          <Grid item xs={12} className={classes.grid1}>
            <Avatar
              alt="provider image"
              className={classes.providerAvatar}
              src={provider.imageUrl}
            ></Avatar>
            <Typography variant="h5">{provider.name}</Typography>
            <Typography variant="h6">
              {provider.address.city +
                ", " +
                provider.address.province}
            </Typography>
          </Grid>
          <Grid className={classes.container} container spacing={1}>
            {petOffers.map((petOffer) => (
              <Grid key={petOffer._id} item xs={6} sm={4} md={3} lg={2} xl={2}>
                <PetOffer petOffer={petOffer} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ):null}
    </>
  );
};

export default Provider;
