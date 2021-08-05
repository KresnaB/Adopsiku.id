import React from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailVerification } from "../../store/actions/userActions";
import { CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

const VerifyingEmail = () => {
  const classes = useStyles();
  const location = useLocation();

  const token = location.pathname.replace("/confirmation/", "");

  const history = useHistory();
  const dispatch = useDispatch();

  dispatch(emailVerification(token, history));

  return (
    <div className={classes.container} style={{ marginTop: "5rem" }}>
      <CircularProgress />{" "}
    </div>
  );
};

export default VerifyingEmail;
