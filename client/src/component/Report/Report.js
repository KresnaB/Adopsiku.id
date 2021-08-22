import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
} from "@material-ui/core";

import React from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Report = ({ report }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.userLogin.userInfo);
  return (
    <Card className={classes.card}>
      <CardMedia>
        <CardMedia
          className={classes.media}
          image={
            report.photos[0] ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h6">{report.name}</Typography>
        <div variant="body2">
          <Chip
            size="small"
            label={
              report.reportDuration === 0
                ? "Durasi belum di set"
                : "Laporkan setiap " + report.reportDuration + " Minggu"
            }
            style={{ backgroundColor: "#66bb6a" }}
            className={classes.statusLabel}
          />
        </div>
      </CardContent>
      <CardActions>
        {user.role === "Adopter" ? (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/reportslist/${report._id}`}
          >
            Lihat Laporan
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/dashboard/reportslist/${report._id}`}
          >
            Lihat Laporan
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Report;
