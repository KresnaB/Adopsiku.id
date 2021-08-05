/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@material-ui/core";
//import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";
import Input from "../../../component/FormComponent/Input";
import {
  registerAdopter,
  registerIndProvider,
  registerOrgProvider,
} from "../../../store/actions/userActions";
//import { GOOGLE_AUTH } from "../../../constants/actionTypes";
import validation from "./validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = ({ role }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const error = useSelector((state) => state);
  //const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const { loading } = userRegister;

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      switch (role) {
        case "adopter":
          dispatch(registerAdopter(formData, history));
          break;
        case "individual":
          dispatch(registerIndProvider(formData, history));
          break;
        case "organization":
          dispatch(registerOrgProvider(formData, history));
          break;
        default:
          console.log(role);
      }
    }
  }, [errors]);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(formData));
    setDataIsCorrect(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;
  //   console.log(result);
  //   dispatch({ type: GOOGLE_AUTH, payload: { result, token } });
  //   history.push(`/register/complete/${role}`);
  //   // history.push('/petOffers');
  // };

  // const googleFailure = (error) => {
  //   console.log(error);
  //   console.log("Google Sign in was unsuccesful. Try again later");
  // };

  let roleType;
  switch (role) {
    case "adopter":
      roleType = "Pengadopsi";
      break;
    case "individual":
      roleType = "Penyedia Hewan Individu";
      break;
    case "organization":
      roleType = "Penyedia Hewan Organisasi";
      break;
    default:
      console.log(role);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Daftar Sebagai {roleType}
        </Typography>
        <Typography className={classes.sub}>
          Cari hewan dan ajukan adopsi sekarang!
        </Typography>
        {loading && <CircularProgress />}
        {Object.keys(errors).length !== 0 ? (
          <Alert severity="warning" className={classes.alert}>
            {errors.name && (
              <Typography className={classes.error} variant="body2">
                {errors.name}
              </Typography>
            )}
            {errors.password && (
              <Typography className={classes.error} variant="body2">
                {errors.password}
              </Typography>
            )}
            {errors.confirmPassword && (
              <Typography className={classes.error} variant="body2">
                {errors.confirmPassword}
              </Typography>
            )}
          </Alert>
        ) : (
          <></>
        )}
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Input
              required
              name="name"
              label="Nama Lengkap"
              handleChange={handleChange}
              autoFocus
            />

            <Input
              required
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
              helperText={error.email ? error.email : ""}
              error={error.email ? true : false}
            />

            <Input
              required
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              helperText={error.password ? error.password : ""}
              error={error.password ? true : false}
              handleShowPassword={handleShowPassword}
              half
            />

            <Input
              required
              name="confirmPassword"
              label="Confirm Password"
              handleChange={handleChange}
              type="password"
              helperText={error.confirmPassword ? error.confirmPassword : ""}
              error={error.confirmPassword ? true : false}
              half
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
              Daftar
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Daftar
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
                Daftar dengan Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <div item className={classes.link}>
            <Button
              component={Link}
              to="/login"
              className={classes.otherAuthLink}
            >
              Sudah punya akun? Masuk
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
