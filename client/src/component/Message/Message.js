import React from "react";
import useStyles from "./styles";
import { Avatar, Typography } from "@material-ui/core";
import { format } from "timeago.js";

const Message = ({ own, message, image }) => {
  const classes = useStyles();
  return (
    <>
      {own ? (
        <div className={classes.messageContainerOwn}>
          <div className={classes.messageTop}>
            <Typography className={classes.messageOwn} variant="body1">
              {message.content}
            </Typography>
            <Avatar alt="Remy Sharp" src={image} />
          </div>
          <div>
            <Typography className={classes.MessageTime} variant="body2">
              {format(message.createdAt)}
            </Typography>
          </div>
        </div>
      ) : (
        <div>
          <div className={classes.messageTop}>
            <Avatar alt="Remy Sharp" src={image} />
            <Typography className={classes.message} variant="body1">
              {message.content}
            </Typography>
          </div>
          <div>
            <Typography className={classes.MessageTime} variant="body2">
              {format(message.createdAt)}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
