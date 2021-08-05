/* eslint-disable default-case */
import React from "react";
import { Button, Paper, Typography, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const ProfileCompletionScreen = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  let description;
  switch (userInfo.role) {
    case "Adopter":
      description =
        "Dapatkan akses untuk mengajukan adopsi dengan melengkapi profil!";
      break;
    case "IndividualProvider":
      description =
        "Dapatkan akses untuk menawarkan hewan dengan melengkapi profil!";
      break;
    case "OrganizationalProvider":
      description =
        "Dapatkan akses untuk untuk menawarkan hewan dengan melengkapi profil!";
      break;
  }
  let update;
  if (userInfo.role === "Adopter") {
    update = "/myprofile";
  } else {
    update = "/dashboard/myprofile";
  }
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Typography className={classes.title}>Lengkapi Profil Anda</Typography>
        <Typography className={classes.description}>{description}</Typography>
        <Button
          component={Link}
          variant="contained"
          to={update}
          color="primary"
        >
          Lengkapi Sekarang
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfileCompletionScreen;
