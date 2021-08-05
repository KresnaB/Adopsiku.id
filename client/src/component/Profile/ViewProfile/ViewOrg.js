import React from "react";
import { Typography, Avatar, Paper, Grid, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import moment from "moment";
import DataOrg from "../DataOrg";

const ViewOrg = () => {
  const user = useSelector((state) => state.userLogin.userInfo);
  const classes = useStyles();
  const profile = useSelector((state) => state.userProfile.userInfo);

  const veterinarian = { ...profile.veterinarian };
  const role = user.role;

  let update;
  if (role === "Adopter") {
    update = "/updateprofile";
  } else {
    update = "/dashboard/updateprofile";
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Avatar
        className={classes.photoProfile}
        variant="rounded"
        alt={profile.name}
        src={profile.imageUrl}
      ></Avatar>
      <Typography className={classes.join}>
        Bergabung {moment(profile.createdAt).format("DD MMM YYYY")}
      </Typography>
      <Button
        component={Link}
        to={update}
        className={classes.auth}
        variant="contained"
        color="primary"
      >
        Ubah Profil
      </Button>
      <Grid container>
        <Grid item sm={6} className={classes.paperProfile}>
          <Typography className={classes.title}>
            Profil Organisasi Penyedia Hewan
          </Typography>
          <DataOrg label="Nama Organisasi" value={profile.name} />
          <DataOrg label="Email" value={profile.email} />
          <DataOrg label="Nomor Telepon" value={profile.phoneNumber} />
          <DataOrg label="Nomor KTP" value={profile.identityNumber} />
          <DataOrg
            label="Alamat"
            value={
              (profile.address.additional
                ? profile.address.additional + " "
                : "") +
              (profile.address.village ? profile.address.village + " " : "") +
              (profile.address.district ? profile.address.district + " " : "") +
              (profile.address.city ? profile.address.city + " " : "") +
              (profile.address.province
                ? "Provinsi " + profile.address.province + " "
                : "")
            }
          />
        </Grid>
        <Grid item sm={6} className={classes.paperProfile}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title} align="left">
              Klinik Hewan Langganan
            </Typography>
          </div>
          <DataOrg label="Nama Klinik Hewan" value={veterinarian.name} />
          <DataOrg
            label="Penanggung Jawab"
            value={veterinarian.personInCharge}
          />
          <DataOrg label="Alamat" value={veterinarian.address} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewOrg;
