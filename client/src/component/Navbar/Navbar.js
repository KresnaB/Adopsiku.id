import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { logout } from "../../store/actions/userActions";

export default function PrimarySearchAppBar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let route;
  if (userInfo) {
    if (userInfo.role === "Adopter") {
      route = "/myprofile/";
    } else {
      route = "/dashboard/pet";
    }
  }

  const logoutHandler = () => {
    dispatch(logout());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to={route}>
        {userInfo?.role === "Adopter" ? "Profil" : "Dashboard"}
      </MenuItem>
      {userInfo?.role === "Adopter" ? (
        <MenuItem onClick={handleMenuClose} component={Link} to={"/adoptions"}>
          Pengajuan Adopsi
        </MenuItem>
      ) : null}
      {userInfo?.role === "Adopter" ? (
        <MenuItem onClick={handleMenuClose} component={Link} to={"/reports"}>
          Pelaporan Adopsi
        </MenuItem>
      ) : null}
      {userInfo?.role === "Adopter" ? (
        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to={"/conversations"}
        >
          Chat
        </MenuItem>
      ) : null}
      <MenuItem onClick={logoutHandler}>Keluar</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {userInfo ? (
        <div>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={1} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifikasi</p>
          </MenuItem>
          <MenuItem
            onClick={handleMobileMenuClose}
            component={Link}
            to="/adoptions"
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {userInfo?.role === "Adopter" ? <p>Profil</p> : <p>Dashboard</p>}
          </MenuItem>
          {userInfo?.role === "Adopter" ? (
            <MenuItem
              onClick={handleMobileMenuClose}
              component={Link}
              to={route}
            >
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Pengajuan Adopsi</p>
            </MenuItem>
          ) : null}
          {userInfo?.role === "Adopter" ? (
            <MenuItem
              onClick={handleMobileMenuClose}
              component={Link}
              to={"/reports"}
            >
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Pelaporan Adopsi</p>
            </MenuItem>
          ) : null}
          <MenuItem onClick={logoutHandler}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Keluar</p>
          </MenuItem>
        </div>
      ) : (
        <>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="primary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Daftar</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={1} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Masuk</p>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color="secondary" className={classes.appBar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            className={classes.title}
            variant="h5"
            noWrap
          >
            adopsiku
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              className={classes.auth}
              component={Link}
              to="/search"
              variant="contained"
              color="primary"
              fontWeight="fontWeightBold"
            >
              Cari
            </Button>
            {userInfo ? (
              <>
                {/* <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={1} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    className={classes.purple}
                    alt={userInfo.name}
                    src={userInfo.imageUrl}
                  ></Avatar>
                  <Typography className={classes.userName}>
                    {userInfo.name}
                  </Typography>
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  className={classes.auth}
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                  fontWeight="fontWeightBold"
                >
                  Masuk
                </Button>
                <Button
                  className={classes.auth}
                  component={Link}
                  to="/usertype/register"
                  variant="contained"
                  color="primary"
                  fontWeight="fontWeightBold"
                >
                  Daftar
                </Button>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
