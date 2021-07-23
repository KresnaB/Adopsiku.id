import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
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
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  btn: {
    borderRadius: "5em",
    boxShadow: "none",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  radioBtn: {
    margin: "10px 10px",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 500,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 266,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
  },
  error: {
    color: "#BB371A",
    marginLeft: theme.spacing(1),
  },
  submitBtn: {
    display: "flex",
    margin: theme.spacing(1),
    justifyContent: "center",
  },
  file: {
    paddingBottom: "0.5rem",
  },
}));
