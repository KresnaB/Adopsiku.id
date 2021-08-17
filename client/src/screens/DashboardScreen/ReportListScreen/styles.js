import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  pageTitle: {
    margin: theme.spacing(1),
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  addContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  addButton: {
    margin: theme.spacing(1),
    borderRadius: "5em",
    boxShadow: "none",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  addIcon: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      color: theme.palette.primary.main,
    },
  },
  card: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  action: {
    display: "flex",
    flexDirection: "row",
  },
  details: {
    display: "flex",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.5rem",
  },
  media: {
    width: "5rem",
    height: "7rem",
    [theme.breakpoints.down("sm")]: {
      width: "10.5rem",
    },
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: "0.2rem",
    marginRight: "0.2rem",
  },
  paperModal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "0.5rem",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20rem",
  },
  report: {
    height: "800px",
    overflowY: "auto",
  },
}));
