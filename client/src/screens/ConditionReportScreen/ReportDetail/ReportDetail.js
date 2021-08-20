import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  detailReport,
  updateStatusReport,
} from "../../../store/actions/conditionReportActions";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
} from "@material-ui/core";
import "pure-react-carousel/dist/react-carousel.es.css";
import ImageCarousel from "../../../component/ImageCarousel/ImageCarousel";

const ReportDetail = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.userInfo);
  const reportDetail = useSelector((state) => state.reportDetail);
  const { loading, error, conditionReport } = reportDetail;

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (
      conditionReport === undefined ||
      conditionReport._id === undefined ||
      !conditionReport._id ||
      conditionReport._id !== id
    ) {
      dispatch(detailReport(id));
    }
  }, [dispatch, id]);

  const onClick = () => {
    setStatus(true);
  };

  useEffect(() => {
    if (conditionReport !== undefined && status === true) {
      const data = { status: true };
      dispatch(updateStatusReport(id, data));
    }
  }, [dispatch, status]);

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
            <ImageCarousel
              items={conditionReport.report.photos}
            ></ImageCarousel>
          </Grid>
          {user.role === "Adopter" ? (
            <Grid item xs={12} md={12}>
              <Card fluid="true" className={classes.card1} variant="outlined">
                <CardContent>
                  <div className={classes.text}></div>
                  <div className={classes.text}>
                    <Typography variant="h6">Tipe</Typography>
                    <Typography variant="body1">
                      {conditionReport.report.type === 0
                        ? "Kesehatan"
                        : "Aktivitas"}
                    </Typography>
                    <Typography variant="h6">Judul</Typography>
                    <Typography variant="body1">
                      {conditionReport.report.title}
                    </Typography>
                  </div>
                  <div className={classes.text}>
                    <Typography variant="h6">Deskripsi</Typography>
                    <Typography variant="body1">
                      {conditionReport.report.description}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} md={8}>
              <Card fluid="true" className={classes.card1} variant="outlined">
                <CardContent>
                  <div className={classes.text}></div>
                  <div className={classes.text}>
                    <Typography variant="h6">Tipe</Typography>
                    <Typography variant="body1">
                      {conditionReport.report.type === 0
                        ? "Kesehatan"
                        : "Aktivitas"}
                    </Typography>
                    <Typography variant="h6">Judul</Typography>
                    <Typography variant="body1">
                      {conditionReport.report.title}
                    </Typography>
                  </div>
                  <div className={classes.text}>
                    <Typography variant="h6">Deskripsi</Typography>
                    <Typography variant="body1">
                      {conditionReport.report.description}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )}
          {user.role === "Adopter" ? (
            <></>
          ) : (
            <Grid item xs={12} md={4}>
              <Card fluid="true" className={classes.card2}>
                <CardContent>
                  <div className={classes.buttonGroup}>
                    <>
                      {status === null ? (
                        conditionReport.report.status ? (
                          <Button disabled className={classes.button2}>
                            Sudah Ditandai Dibaca
                          </Button>
                        ) : (
                          <Button className={classes.button2} onClick={onClick}>
                            Tandai Sudah Dibaca
                          </Button>
                        )
                      ) : (
                        <Button disabled className={classes.button2}>
                          Sudah Ditandai Dibaca
                        </Button>
                      )}
                    </>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default ReportDetail;
