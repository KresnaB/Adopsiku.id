import { Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

import sendImage from "../../images/email.png";
import { useSelector } from "react-redux";

const EmailSent = () => {
  const userInfo = useSelector((state) => state.userRegister.userInfo);

  const classes = useStyles();

  return (
    <Grid container className={classes.imgContainer}>
      <Grid lg={12} md={12} sm={12} xs={12}>
        <img className={classes.image} src={sendImage} alt="email sent"></img>
      </Grid>
      <Grid className={classes.captionContainer}>
        <Typography variant="h6">
          Halo {userInfo.name}, adopsiku telah mengirim link aktivasi akun ke
          alamat email {userInfo.email}.
        </Typography>
        <Typography variant="h6">
          Segera aktifkan akunmu untuk mengakses aplikasi!
        </Typography>
        <Typography variant="body2">
          Email tidak ditemukan? Periksa spam email dari adopsiku.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmailSent;
