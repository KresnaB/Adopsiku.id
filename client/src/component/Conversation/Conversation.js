import React from "react";
import useStyles from "./styles";
import { Avatar, Typography } from "@material-ui/core";

const Conversation = ({ conversation, own }) => {
  const classes = useStyles();
  const user = conversation.participants.filter(
    (participant) => participant._id !== own
  );
  return (
    <div className={classes.container}>
      <Avatar
        className={classes.img}
        alt={user[0] !== undefined ? user[0].name : "user"}
        src={
          user[0] !== undefined
            ? user[0].imageUrl !== undefined
              ? user[0].imageUrl
              : ""
            : ""
        }
      />
      <Typography className={classes.name} variant="h6">
        {user[0].name}
      </Typography>
    </div>
  );
};

export default Conversation;
