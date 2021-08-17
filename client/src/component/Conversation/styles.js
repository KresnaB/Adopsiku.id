import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  name: {
    padding: "5px 0px 0px 20px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  img: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },
  container: {
    display: "flex",
    padding: "10px",
    margin: "10px 10px 10px 0px",
    cursor: "pointer",
    backgroundColor: "#FFB822",
    //boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#d6ccab",
    },
  },
}));
