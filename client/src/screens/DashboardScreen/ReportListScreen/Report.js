import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  CardActions,
} from "@material-ui/core";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@material-ui/lab";
import { FindInPage, DeleteForever, Edit } from "@material-ui/icons";
import { deleteReport } from "../../../store/actions/conditionReportActions";
import ConfirmationDialog from "../../../component/Modal/ConfirmationDialog";

const Report = ({ report }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.userLogin.userInfo);

  const handleDeleteModalOpen = () => {
    setOpen(true);
  };

  const handleDeleteModalClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteReport(report._id));
    setOpen(false);
  };
  return (
    <TimelineItem>
      <TimelineOppositeContent style={{ flex: 0.3 }}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="body2">Waktu Pelaporan</Typography>
          <Typography variant="body2">
            {moment(report.createdAt).format("DD MMM YYYY")}
          </Typography>
        </Paper>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
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
            <div variant="h6">
              <Chip
                size="small"
                label={report.type === 0 ? "Kesehatan" : "Aktivitas"}
                style={{ backgroundColor: "#66bb6a" }}
                className={classes.statusLabel}
              />
            </div>
            <Typography variant="body1">{report.title}</Typography>
            <div variant="body2">
              <Chip
                size="small"
                label={report.status ? "Sudah disetujui" : "Belum disetujui"}
                style={
                  report.status
                    ? { backgroundColor: "#66bb6a" }
                    : { backgroundColor: "#e57373" }
                }
                className={classes.statusLabel}
              />
            </div>
          </CardContent>
          <CardActions>
            <div>
              {user.role === "Adopter" ? (
                <IconButton
                  aria-label="Detail"
                  className={classes.tableActionButton}
                  component={Link}
                  to={`/report/detail/${report._id}`}
                >
                  <FindInPage
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="Detail"
                  className={classes.tableActionButton}
                  component={Link}
                  to={`/dashboard/detail/${report._id}`}
                >
                  <FindInPage
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              )}
            </div>
            {user.role === "Adopter" ? (
              <div className={classes.action}>
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  component={Link}
                  to={`/report/edit/${report._id}`}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  className={classes.tableActionButton}
                  onClick={handleDeleteModalOpen}
                >
                  <DeleteForever
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
                <ConfirmationDialog
                  handleOpen={open}
                  handleClose={handleDeleteModalClose}
                  handleAction={handleDelete}
                  title="Hapus laporan kondisi hewan"
                  body="Apa kamu yakin untuk menghapus laporan kondisi hewan ini?"
                />
              </div>
            ) : (
              <></>
            )}
          </CardActions>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
};

export default Report;
