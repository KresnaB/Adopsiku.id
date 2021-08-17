import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginLeft: "0.4rem",
    display: "flex",
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
    height: "5rem",
  },
}));
