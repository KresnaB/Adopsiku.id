import React, { useEffect } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { reportListByAdoption } from "../../../store/actions/conditionReportActions";
import { Grid, Typography, CircularProgress, Alert } from "@material-ui/core";
import Report from "../../../component/Report/Report";
import Pets from "@material-ui/icons/Pets";

const AdoptionsListAdp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // // Retrieve data from reducer
  const user = useSelector((state) => state.userLogin.userInfo);
  const reports = useSelector((state) => state.reportList);
  const { loading, error, conditionReport } = reports;

  useEffect(() => {
    if (
      conditionReport === undefined ||
      conditionReport._id === undefined ||
      !conditionReport._id
    ) {
      dispatch(reportListByAdoption(user.id));
    }
  }, [dispatch, user.id]);
  return (
    <>
      {loading === undefined || loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.title}>
              <Pets />
              Daftar hewan yang berhasil diadopsi
            </Typography>
          </Grid>
          {conditionReport.reports.map((report) => (
            <Grid key={report._id} item xs={12} md={3}>
              <Report report={report.pet} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default AdoptionsListAdp;
