import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  searchUser: {
    width: "98%",
    margin: "10px 10px 10px 0px",
  },
  width: {
    height: "100%",
  },
  chatContainer: {
    padding: "20px 10px 10px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    borderLeft: "2px solid #d6ccab",
    //border: "0px 5px 0px 5px solid #FFB822",
  },
  chatContent: {
    height: "700px",
    [theme.breakpoints.down("sm")]: {
      height: "500px",
    },
    overflowY: "auto",
  },
  action: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
  },
  messageInput: {
    width: "100%",
  },
  historyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d6ccab",
    width: "180px",
    margin: "auto",
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  convTittle: {
    display: "flex",
  },
  convTittleText: {
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    fontWeight: "bold",
    marginLeft: "10px",
  },
  alert: {
    marginTop: "5px",
  },
  convList: {
    height: "800px",
    [theme.breakpoints.down("sm")]: {
      height: "650px",
    },
    overflowY: "auto",
  },
  history: {
    paddingLeft: "5px",
  },
  sendButton: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sendButtonContainer: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    padding: "10px",
  },
}));
