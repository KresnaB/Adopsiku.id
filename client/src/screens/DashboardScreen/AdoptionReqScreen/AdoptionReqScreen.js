import React from "react";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import AdoptionPrvTabList from "./AdoptionPrvTabList";

const AdoptionReqScreen = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item md={6} xs={10}>
          <Typography variant="h6" className={classes.pageTitle}>
            Daftar Pengajuan Adopsi
          </Typography>
        </Grid>
      </Grid>
      <AdoptionPrvTabList />
    </>
  );
};

export default AdoptionReqScreen;
