import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
//import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
//import { signin, googleSignIn } from "../../actions/auth";
import { login } from "../../store/actions/userActions";
import { Alert } from "@material-ui/lab";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ location, history }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   try {
  //     dispatch(googleSignIn(result, history));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleFailure = (error) => {
  //   console.log(error);
  //   console.log("Google Sign in was unsuccesful. Try again later");
  // };

  console.log(loading);
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading && <CircularProgress />}
        <Typography variant="h6">Masuk</Typography>
        <Typography className={classes.sub}>
          Cari atau tawarkan hewan adopsi sekarang!
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>

          {loading ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled
            >
              Masuk
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Masuk
            </Button>
          )}

          {/* <GoogleLogin
            clientId="656961866959-maloour47r5anft9e9sejn0n30lv6u9j.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disable={renderProps.disable}
                startIcon={<Icon />}
                variant="contained"
              >
                Masuk dengan google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <div className={classes.link}>
            <Button
              component={Link}
              to="/usertype/register"
              className={classes.otherAuthLink}
            >
              Belum punya akun? Ayo Daftar!
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
