import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Home,
  PermIdentity,
  ChatBubbleOutline,
  Pets,
  ListAlt,
  Assignment,
} from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useStyles from "./styles";

export default function ClippedDrawer() {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname.toString();
  const user = useSelector((state) => state.userLogin.userInfo);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer} align="center">
          <Avatar className={classes.avatar} src={user.imageUrl} />
          <Typography variant="h5" className={classes.name}>
            {user.name}
          </Typography>
          <List>
            {/* {path === "/dashboard" ? (
              <Button className={classes.button} variant="contained" disabled>
                {" "}
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
                <Home className={classes.icon} />
                <span className={classes.itemLabel}>Home</span>
              </Button>
            )} */}
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
            {path === "/conversations" ? (
              <Button className={classes.button} variant="contained" disabled>
                <ChatBubbleOutline className={classes.icon} />{" "}
                <span className={classes.itemLabel}>Chat</span>
              </Button>
            ) : (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                component={Link}
                to="/conversations"
              >
                <ChatBubbleOutline className={classes.icon} />{" "}
                <span className={classes.itemLabel}>Chat</span>
              </Button>
            )}
            {path === "/dashboard/adoptions" ? (
              <Button className={classes.button} variant="contained" disabled>
                <ListAlt className={classes.icon} />
                <span className={classes.itemLabel}>Pengajuan</span>
              </Button>
            ) : (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                component={Link}
                to="/dashboard/adoptions"
              >
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
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                component={Link}
                to="/dashboard/reports"
              >
                <Assignment className={classes.icon} />{" "}
                <span className={classes.itemLabel}>Laporan</span>
              </Button>
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
