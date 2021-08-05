import React from "react";
import {
  Button,
  Switch,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import useStyles from "./styles";
import { ChevronLeftRounded, Done } from "@material-ui/icons";

const Commitment = ({
  _id,
  handleChange,
  commitment: {
    familyApproval,
    movingPlan,
    weddingPlan,
    childPlan,
    financialPlan,
  },
  handleNext,
  handleBack,
}) => {
  const classes = useStyles();

  return (
    <form
      className={classes.container}
      autoComplete="off"
      noValidate
      onSubmit={handleNext}
    >
      <Grid container className={classes.gridContainer}>
        <Typography variant="body1" className={classes.title}>
          Persetujuan Keluarga
        </Typography>
        <Grid item xs={10} sm={10} md={11} lg={11}>
          <Typography variant="body1">
            Apakah semua anggota keluarga sudah menyetujui rencana untuk
            mengadopsi?
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={1}>
          <Switch
            color="primary"
            checked={familyApproval}
            onChange={(e) => handleChange(e, 2)}
            name="familyApproval"
            inputProps={{ "aria-label": "Family Approval" }}
          />
        </Grid>
        <Typography variant="body1" className={classes.title}>
          Rencana Pindah
        </Typography>
        <Grid item xs={10} sm={10} md={11} lg={11}>
          <Typography variant="body1">
            Jika Anda pindah rumah/kota/negara, apakah Anda akan tetap membawa
            hewan yang akan diadopsi bersama Anda?
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={1}>
          <Switch
            color="primary"
            checked={movingPlan}
            onChange={(e) => handleChange(e, 2)}
            name="movingPlan"
            inputProps={{ "aria-label": "Moving Plan" }}
          />
        </Grid>
        <Typography variant="body1" className={classes.title}>
          Rencana Menikah
        </Typography>
        <Grid item xs={10} sm={10} md={11} lg={11}>
          <Typography variant="body1">
            Jika Anda mempunyai rencana/sudah menikah, apakah Anda dapat
            menjamin bahwa hewan yang akan diadopsi akan tinggal bersama Anda
            dan pasangan Anda?
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={1}>
          <Switch
            color="primary"
            checked={weddingPlan}
            onChange={(e) => handleChange(e, 2)}
            name="weddingPlan"
            inputProps={{ "aria-label": "Wedding Plan" }}
          />
        </Grid>
        <Typography variant="body1" className={classes.title}>
          Rencana Anak
        </Typography>
        <Grid item xs={10} sm={10} md={11} lg={11}>
          <Typography variant="body1">
            Jika Anda mempunyai rencana/sudah mempunyai anak, apakah Anda dapat
            memastikan bahwa anak tersebut akan memperlakukan hewan dengan baik?
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={1}>
          <Switch
            color="primary"
            checked={childPlan}
            onChange={(e) => handleChange(e, 2)}
            name="childPlan"
            inputProps={{ "aria-label": "Child Plan" }}
          />
        </Grid>
        <Typography variant="body1" className={classes.title}>
          Rencana Biaya
        </Typography>
        <Grid item xs={10} sm={10} md={11} lg={11}>
          <Typography variant="body1">
            Apakah Anda yakin bahwa Anda sanggup untuk memenuhi segala kebutuhan
            dasar dan tambahan untuk hewan yang akan diadopsi?
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={1}>
          <Switch
            color="primary"
            checked={financialPlan}
            onChange={(e) => handleChange(e, 2)}
            name="financialPlan"
            inputProps={{ "aria-label": "Financial Plan" }}
          />
        </Grid>
      </Grid>
      <div className={classes.nextBtnContainer}>
        <Button
          className={classes.nextBtn}
          variant="contained"
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Kembali
        </Button>
        <IconButton
          className={classes.nextIcon}
          size="small"
          onClick={handleBack}
        >
          <ChevronLeftRounded />
        </IconButton>
        <Button
          className={classes.nextBtn}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          Selanjutnya
        </Button>
        <IconButton
          className={classes.nextIcon}
          size="small"
          onClick={handleNext}
        >
          <Done />
        </IconButton>
      </div>
    </form>
  );
};

export default Commitment;
