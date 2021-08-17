import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    flexDirection: "column",
  },
  messageContainerOwn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: "10px",
  },
  messageTop: {
    display: "flex",
  },
  message: {
    marginLeft: "10px",
    padding: "10px",
    backgroundColor: "#FFB822",
    borderRadius: "20px",
    fontSize: "18px",
    maxWidth: "400px",
  },
  messageOwn: {
    marginRight: "10px",
    padding: "10px",
    backgroundColor: "#d6ccab",
    borderRadius: "20px",
    fontSize: "18px",
    maxWidth: "400px",
  },
  own: {
    alignSelf: "right",
  },
  MessageTime: {
    fontSize: "12px",
  },
}));
