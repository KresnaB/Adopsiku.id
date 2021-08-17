import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../../store/actions/conversationActions";
import { useHistory } from "react-router-dom";

const StartConversationScreen = ({ id }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    if (id && userInfo) {
      const newConversation = {
        senderId: userInfo.id,
        receiverId: id,
      };
      dispatch(createConversation(newConversation, history));
    }
  }, [id, userInfo]);

  return <></>;
};
export default StartConversationScreen;
