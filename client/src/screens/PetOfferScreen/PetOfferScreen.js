import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "pure-react-carousel/dist/react-carousel.es.css";
import useStyles from "./styles";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { listPetOfferDetails } from "../../store/actions/petOfferActions";
import { Link } from "react-router-dom";
import ImageCarousel from "../../component/ImageCarousel/ImageCarousel";

const PetOfferScreen = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Variable to save Pet Offer Detail data from reducer
  const petOfferDetails = useSelector((state) => state.petOfferDetails);
  const { loading, error, petOffer, adopter } = petOfferDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Variable to save UserLogin info
  const user = useSelector((state) => state.userLogin.userInfo);

  // Get pet offer detail info
  useEffect(() => {
    if (
      petOffer === undefined ||
      petOffer._id === undefined ||
      !petOffer._id ||
      petOffer._id !== id
    ) {
      dispatch(listPetOfferDetails(id));
    }
  }, [dispatch, id, petOffer]);

  return (
    <>
      {loading === undefined || loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div className={classes.content}>
          <ImageCarousel items={petOffer.photos}></ImageCarousel>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Card fluid="true" className={classes.card1}>
                <CardContent>
                  <Typography className={classes.title} variant="h4">
                    {petOffer.name}
                  </Typography>
                  <div className={classes.subTitle1}>
                    <Typography variant="h6" className={classes.subTitle2}>
                      {petOffer.breeds.join(", ")}
                    </Typography>
                    <Typography className={classes.address} variant="h6">
                      {petOffer.provider.address.city +
                        ", " +
                        petOffer.provider.address.province}
                    </Typography>
                  </div>
                  <div className={classes.body1}>
                    <Typography className={classes.char} variant="body2">
                      {petOffer.age} Bulan
                    </Typography>
                    <Typography className={classes.char} variant="body2">
                      {petOffer.gender ? "Betina" : "Jantan"}
                    </Typography>
                    {petOffer.size ? (
                      <Typography className={classes.char} variant="body2">
                        {petOffer.size} kg
                      </Typography>
                    ) : (
                      ""
                    )}
                    {petOffer.furLength ? (
                      <Typography variant="body2">
                        {"Bulu " + petOffer.furLength}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {petOffer.chirping ? (
                      <Typography variant="body2">
                        {"Kicauan " + petOffer.chirping}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {petOffer.trained !== undefined ? (
                      <>
                        <Typography
                          variant="body1"
                          className={classes.subTitle3}
                        >
                          Pelatihan rumah
                        </Typography>
                        <Typography variant="body2">
                          {petOffer.trained ? "Ya" : "Tidak"}
                        </Typography>
                      </>
                    ) : null}
                    {petOffer.spayedNeutered !== undefined ||
                    petOffer.vaccinated !== undefined ? (
                      <>
                        <Typography
                          variant="body1"
                          className={classes.subTitle3}
                        >
                          Kesehatan
                        </Typography>
                        <Typography variant="body2">
                          {petOffer.spayedNeuteured
                            ? "Sterilisasi"
                            : "" + petOffer.vaccinated
                            ? "Vaksinasi"
                            : ""}
                        </Typography>
                      </>
                    ) : null}
                    <Typography variant="body1" className={classes.subTitle3}>
                      Perlakuan khusus
                    </Typography>
                    <Typography variant="body2">
                      {petOffer.specialNeeds}
                    </Typography>
                  </div>
                  <div className={classes.body2}>
                    <Typography variant="h6" className={classes.subTitle2}>
                      Tentang {petOffer.name}
                    </Typography>
                    <Typography variant="body2">
                      {petOffer.description}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" className={classes.subTitle2}>
                      Informasi Adopsi
                    </Typography>
                    <Typography variant="body1" className={classes.subTitle3}>
                      Biaya Adopsi
                    </Typography>
                    <Typography variant="body2">
                      {petOffer.adoptFee === 0
                        ? "Gratis"
                        : "Rp" + petOffer.adoptFee}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card fluid="true" className={classes.card2}>
                <CardContent>
                  <div className={classes.buttonGroup}>
                    {petOffer.status === 1 ? (
                      <>
                        <Alert severity="info" className={classes.alertSuccess}>
                          Dalam diskusi{" "}
                          {adopter[0]
                            ? " dengan " + adopter[0].adopter.name
                            : ""}{" "}
                        </Alert>
                      </>
                    ) : petOffer.status === 2 ? (
                      <>
                        <Alert
                          severity="success"
                          className={classes.alertSuccess}
                        >
                          Berhasil diadopsi{" "}
                          {adopter[0] ? " oleh " + adopter[0].adopter.name : ""}
                        </Alert>
                      </>
                    ) : user?.role !== "IndividualProvider" &&
                      user?.role !== "OrganizationalProvider" ? (
                      <>
                        <Typography
                          align="center"
                          variant="h5"
                          className={classes.subTitle3}
                        >
                          Tertarik dengan {petOffer.name}?
                        </Typography>
                        {userInfo ? (
                          <>
                            <Button
                              className={classes.button2}
                              component={Link}
                              to={`/adoption/apply/${petOffer._id}`}
                            >
                              Ajukan Adopsi
                            </Button>
                            <Button
                              className={classes.button2}
                              component={Link}
                              to={`/start/conversations/${petOffer.provider._id}`}
                            >
                              Chat {petOffer.provider.name}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              className={classes.button2}
                              component={Link}
                              to={"/login"}
                            >
                              Ajukan Adopsi
                            </Button>
                            <Button
                              className={classes.button2}
                              component={Link}
                              to={"/login"}
                            >
                              Chat {petOffer.provider.name}
                            </Button>
                          </>
                        )}
                      </>
                    ) : null}
                    <Typography variant="h6" className={classes.subTitle3}>
                      Ditawarkan oleh
                    </Typography>
                    <Paper className={classes.provContainer}>
                      <Link
                        className={classes.link}
                        to={`/provider/${petOffer.provider._id}`}
                      >
                        <Avatar
                          className={classes.avatar}
                          alt={petOffer.provider.name}
                          src={petOffer.provider.imageUrl}
                        ></Avatar>
                        <Typography
                          variant="h6"
                          className={classes.providerName}
                        >
                          {petOffer.provider.name}
                        </Typography>
                      </Link>
                    </Paper>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default PetOfferScreen;
