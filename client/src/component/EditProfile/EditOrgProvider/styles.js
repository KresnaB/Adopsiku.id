import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  photoProfile: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  join: {
    fontSize: 15,
    marginBottom: theme.spacing(2),
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  value: {
    fontSize: 15,
    marginBottom: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  auth: {
    borderRadius: "5em",
    boxShadow: "none",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  container: {
    marginTop: "1rem",
  },
  radioButton: {
    paddingLeft: "0.5rem",
  },
  submitBtn: {
    display: "flex",
    margin: theme.spacing(1),
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
  },
  error: {
    color: "#BB371A",
    marginLeft: theme.spacing(1),
  },
}));
