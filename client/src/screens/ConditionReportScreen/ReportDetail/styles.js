import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card2: {
    margin: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(3),
    },
    backgroundColor: "#FFB822",
  },
  title: {
    fontWeight: "bold",
  },
  button2: {
    boxShadow: "none",
    fontWeight: "bold",
    minWidth: "200px",
    minHeight: "45px",
    border: "0px",
    borderRadius: "5em",
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    color: "black",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card1: {
    margin: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(3),
    },
  },
  button: {
    boxShadow: "none",
    fontWeight: "bold",
    minWidth: "80px",
    minHeight: "45px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    border: "0px",
    backgroundColor: "#FFB822",
    padding: "0px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  carousel: {
    display: "flex",
    flexDirection: "row",
  },
  slider: {
    width: "700px",
    height: "350px",
    [theme.breakpoints.down("sm")]: {
      width: "400px",
      height: "200px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "700px",
      height: "350px",
    },
  },
  carouselContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  miniCarousel: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  text: {
    borderBottom: "0.2rem solid #FFB822",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20rem",
  },
}));
