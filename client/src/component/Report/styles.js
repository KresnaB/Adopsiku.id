import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    margin: "0.5rem",
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
    height: "6rem",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
