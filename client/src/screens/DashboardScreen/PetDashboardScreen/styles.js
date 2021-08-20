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
  tablePaper: {
    margin: theme.spacing(1),
  },
  tableContainer: {
    maxHeight: 700,
  },
  tableHead: {
    fontWeight: "bold",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  tableHeadHide: {
    fontWeight: "bold",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "200px",
  },
}));
