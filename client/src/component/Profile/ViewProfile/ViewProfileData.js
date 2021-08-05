import React, { useState } from "react";
import { Typography, Avatar, Paper, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import moment from "moment";
import Data from "../Data";

const ViewProfileData = () => {
  const user = useSelector((state) => state.userLogin.userInfo);
  const classes = useStyles();
  const profile = useSelector((state) => state.userProfile.userInfo);
  const address = { ...profile.address };
  // const [test, setTest] = useState(profile);
  // const currentId = user.id;
  const role = user.role;
  console.log(profile.id);
  switch (user.role) {
    case "Adopter":
      // dispatch(registerAdopter(formData, history));
      break;
    case "IndividualProvider":
      // dispatch(registerIndProvider(formData, history));
      break;
    case "OrganizationalProvider":
      // dispatch(registerOrgProvider(formData, history));
      break;
    default:
      console.log(user.role);
  }
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
      <Data label="Nama Lengkap" value={profile.name} />
      <Data label="Email" value={profile.email} />
      <Data label="Nomor Telepon" value={profile.phoneNumber} />
      <Data
        label="Tanggal Lahir"
        value={
          profile.birthDate
            ? moment(profile.birthDate).format("DD MMM YYYY")
            : "-"
        }
      />
      <Data label="Nomor KTP" value={profile.identityNumber} />
      <Data label="Jenis Kelamin" value={profile.gender} />
      <Data label="Pekerjaan Tetap" value={profile.fixedJob} job />
      <Data
        label="Alamat"
        value={
          (address.additional ? address.additional + " " : "") +
          (address.village ? address.village + " " : "") +
          (address.district ? address.district + " " : "") +
          (address.city ? address.city + " " : "") +
          (address.province ? "Provinsi " + address.province + " " : "")
        }
      />
    </Paper>
  );
};

export default ViewProfileData;
