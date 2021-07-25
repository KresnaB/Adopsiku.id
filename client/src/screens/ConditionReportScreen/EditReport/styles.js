import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    padding: "0.5rem",
    margin: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0.2rem",
    },
  },
  input: {
    width: "100%",
    margin: "0.2rem",
  },
  item: {
    padding: "0.1rem",
  },
  media: {
    objectFit: "cover",
    height: "6rem",
    width: "6rem",
    [theme.breakpoints.up("sm")]: {
      height: "9rem",
      width: "9rem",
    },
    [theme.breakpoints.up("md")]: {
      height: "12rem",
      width: "12rem",
    },
    [theme.breakpoints.up("lg")]: {
      height: "15rem",
      width: "15rem",
    },
    [theme.breakpoints.up("xl")]: {
      height: "18rem",
      width: "18rem",
    },
  },
  grid1: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.5rem",
    },
  },
  grid2: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  card: {
    borderRadius: "1rem",
    backgroundColor: "#FFB822",
    height: "100%",
    width: "100%",
  },
  paper: {
    paddingTop: "0.5rem",
    backgroundColor: "#FFF3CE",
    marginBottom: "0.5rem",
  },
  fileInput: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    paddingBottom: "1rem",
  },
  container2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fileBase: {
    display: "none",
  },
  label: {
    cursor: "pointer",
    padding: "5px 10px",
    border: "1px solid black",
    color: "black",
    background: "white",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#BB371A",
    marginLeft: theme.spacing(1),
  },  btn: {
    borderRadius: "5em",
    boxShadow: "none",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  submitBtn: {
    display: "flex",
    margin: theme.spacing(1),
    justifyContent: "center",
  },
}));
