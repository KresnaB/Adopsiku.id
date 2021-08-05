import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Input,
  Button,
  Grid,
  Typography,
  InputLabel,
  Alert,
} from "@material-ui/core";
import MessageSent from "../../images/MessageSent.svg";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resendEmail } from "../../store/actions/userActions";

const ResendEmail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.userRegister.error);

  console.log(error);

  const [email, setEmail] = useState({ email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resendEmail(email, history));
  };

  const handleChange = (e) => {
    setEmail({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={10} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia>
            <img
              className={classes.image2}
              src={MessageSent}
              alt="email sent"
            ></img>
          </CardMedia>
          <CardContent>
            {error ? <Alert severity="error">{error}</Alert> : <></>}
            <Typography variant="h5">
              Sepertinya link verifikasimu kadaluarsa!
            </Typography>
            <Typography variant="h6">
              adopsiku akan mengirim ulang link aktivasi akun ke alamat emailmu
            </Typography>
            <form
              autoComplete="off"
              className={classes.form}
              onSubmit={handleSubmit}
            >
              <InputLabel>Masukan Email</InputLabel>
              <Input
                required
                fullWidth
                name="email"
                label="Email"
                onChange={handleChange}
                type="email"
              />
              {error ? (
                <Button
                  disabled
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Kirim
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Kirim
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResendEmail;
