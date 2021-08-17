import React, { useEffect } from "react";
import useStyles from "./styles";
import {
  Grid,
  CircularProgress,
  Alert,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { reportList } from "../../../store/actions/conditionReportActions";
import { Link } from "react-router-dom";
import { Add, AddCircle } from "@material-ui/icons";
import Report from "./Report";

const ReportListScreen = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.petReportList);
  const { loading, error, conditionReport } = reports;
  const user = useSelector((state) => state.userLogin.userInfo);
  useEffect(() => {
    if (
      !conditionReport ||
      !conditionReport._id ||
      conditionReport._id !== id
    ) {
      dispatch(reportList(id));
    }
  }, [dispatch, id, conditionReport]);
  return (
    <Grid container>
      {user.role === "Adopter" ? (
        <>
          <Grid item xs={10} md={6}>
            <Typography variant="h6" className={classes.pageTitle}>
              Daftar laporan kondisi hewan
            </Typography>
          </Grid>
          <Grid item xs={2} md={6}>
            <div className={classes.addContainer}>
              <Button
                size="small"
                className={classes.addButton}
                component={Link}
                to="/report/create"
                variant="contained"
                color="primary"
                fontWeight="fontWeightBold"
              >
                <Add size="small" />
                Laporan
              </Button>
              <IconButton
                className={classes.addIcon}
                component={Link}
                to="/report/create"
              >
                <AddCircle size="small" />
              </IconButton>
            </div>
          </Grid>
        </>
      ) : (
        <Grid item md={12} xs={12}>
          <Typography variant="h6" className={classes.pageTitle}>
            Daftar laporan kondisi hewan
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={12} className={classes.report}>
        <Grid container className={classes.center}>
          <Grid item xs={12} md={6}>
            <Timeline>
              {loading === undefined || loading ? (
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <Alert severity="error">error</Alert>
              ) : !conditionReport.conditionReports[0] ? (
                <Alert severity="warning">Belum Ada Laporan</Alert>
              ) : (
                conditionReport.conditionReports.map((report) => (
                  <Report key={report._id} report={report} />
                ))
              )}
            </Timeline>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ReportListScreen;
