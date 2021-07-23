import React, { useEffect } from "react";
import { Typography, Button, Avatar } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useSelector } from "react-redux";
import {
  Home,
  PermIdentity,
  ChatBubbleOutline,
  Pets,
  ListAlt,
  Assignment,
} from "@material-ui/icons";
import { useLocation, useHistory, Link } from "react-router-dom";

import useStyles from "./styles";
const Sidebar = () => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const path = location.pathname.toString();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.role === "Adopter") {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <div className={classes.dashMenu} align="center">
      <Avatar
        className={classes.avatar}
        src={
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
      />
      <Typography variant="h4" className={classes.name}>
        {userInfo.name}
      </Typography>
      {path === "/dashboard" ? (
        <Button className={classes.button} variant="contained" disabled>
          <Home className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Home</span>
        </Button>
      ) : (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard"
        >
          <Home className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Home</span>
        </Button>
      )}
      {path === "/dashboard/myprofile" ? (
        <Button className={classes.button} variant="contained" disabled>
          <PermIdentity className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Profil</span>{" "}
        </Button>
      ) : (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard/myprofile"
        >
          <PermIdentity className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Profil</span>
        </Button>
      )}
      {path === "chat" ? (
        <Button className={classes.button} variant="contained" disabled>
          <ChatBubbleOutline className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Chat</span>
        </Button>
      ) : (
        <Button className={classes.button} variant="contained" color="primary">
          <ChatBubbleOutline className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Chat</span>
        </Button>
      )}
      {path === "/dashboard/pet" ? (
        <Button className={classes.button} variant="contained" disabled>
          <Pets className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Hewan Adopsi</span>
        </Button>
      ) : (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard/pet"
        >
          <Pets className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Hewan Adopsi</span>
        </Button>
      )}
      {path === "offer" ? (
        <Button className={classes.button} variant="contained" disabled>
          <ListAlt className={classes.icon} />
          <span className={classes.itemLabel}>Pengajuan</span>
        </Button>
      ) : (
        <Button className={classes.button} variant="contained" color="primary">
          <ListAlt className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Pengajuan</span>
        </Button>
      )}
      {path === "/dashboard/reports" ? (
        <Button className={classes.button} variant="contained" disabled>
          <Assignment className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Laporan</span>
        </Button>
      ) : (
        <Button className={classes.button} variant="contained" color="primary">
          <Assignment className={classes.icon} />{" "}
          <span className={classes.itemLabel}>Laporan</span>
        </Button>
      )}
    </div>
  );
};
export default Sidebar;
