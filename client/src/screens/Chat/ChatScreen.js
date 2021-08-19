import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyle from "./styles";
import Conversation from "../../component/Conversation/Conversation";
import Message from "../../component/Message/Message";
import {
  getUserConversations,
  getMessages,
  sendMessage,
  getArchives,
} from "../../store/actions/conversationActions";
import socketIOClient, { io } from "socket.io-client";
import { History, Chat, Send } from "@material-ui/icons";

const ChatScreen = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const conversationList = useSelector((state) => state.conversationList);
  const { conversations, loading, error } = conversationList;
  const messageList = useSelector((state) => state.messageList);
  const { messages } = messageList;
  const messageCreate = useSelector((state) => state.messageCreate);
  const { message } = messageCreate;
  const archives = useSelector((state) => state.archiveList);

  const [currentConversation, setCurrentConversation] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [openArchives, setOpenArchives] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    //socket.current = io("http://localhost:8900", { transports: ["websocket"] });
    socket.current = io("https://adopsiku-chat.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        receiver: userInfo.id,
        content: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (currentConversation.length !== 0 && arrivalMessage) {
      const currentChat = currentConversation?.participants.filter(
        (participant) => arrivalMessage.sender === participant._id
      );
      if (userMessages && currentChat.length !== 0) {
        setUserMessages([...userMessages, arrivalMessage]);
      }
    }
  }, [arrivalMessage]);

  useEffect(() => {
    console.log("in");
    socket.current.emit("addUser", userInfo.id);
    console.log("in2");
    socket.current.on("getUsers", (users) => {
      console.log(users);
      setOnlineUsers(users);
    });
    console.log("in3");
  }, [userInfo]);

  useEffect(() => {
    if (conversations === undefined) {
      dispatch(getUserConversations(userInfo.id));
    }
  }, [dispatch, userInfo, conversations]);

  useEffect(() => {
    if (currentConversation._id) {
      dispatch(getMessages(currentConversation._id));
    }
  }, [dispatch, currentConversation._id]);

  useEffect(() => {
    if (messageList.loading === false && !error && messages !== undefined) {
      if (openArchives) {
        if (
          archives.loading === false &&
          !error &&
          archives !== undefined &&
          archives.length !== 0
        ) {
          if (
            archives.messages !== undefined &&
            archives.messages.conversationId === currentConversation._id
          ) {
            setUserMessages(
              archives.messages.messages.concat(messages.messages.messages)
            );
          }
        }
      } else {
        setUserMessages(messages.messages.messages);
      }
    }
  }, [messages, archives]);

  useEffect(() => {
    if (message) {
      if (message.message !== undefined) {
        if (userMessages) {
          setUserMessages([...userMessages, message.message]);
        }
      }
    }
  }, [message]);

  useEffect(() => {
    if (openArchives) {
      if (currentConversation._id) {
        dispatch(getArchives(currentConversation._id));
      }
    }
  }, [openArchives]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (currentConversation._id) {
      const receiverId = currentConversation.participants.find(
        (participant) => participant._id !== userInfo.id
      );
      const newChat = {
        sender: userInfo.id,
        receiver: receiverId._id,
        content: newMessage,
      };
      socket.current.emit("sendMessage", {
        senderId: userInfo.id,
        receiverId: receiverId._id,
        text: newMessage,
      });
      dispatch(sendMessage(currentConversation._id, newChat));
      setNewMessage("");
    }
  };

  const changeConversation = (conversation) => {
    if (currentConversation._id !== conversation._id) {
      setCurrentConversation(conversation);
      setUserMessages([]);
      setOpenArchives(false);
    }
  };

  return (
    <>
      {loading === undefined || loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container>
          <Grid item xs={3}>
            <div className={classes.convTittle}>
              <Chat className={classes.chatIcon} />
              <Typography className={classes.convTittleText} variant="body1">
                Daftar Percakapan
              </Typography>
            </div>
            <div className={classes.convList}>
              {conversations
                ? conversations.map((conversation) => (
                    <div
                      key={conversation._id}
                      onClick={() => {
                        changeConversation(conversation);
                      }}
                      className={classes.button}
                    >
                      <Conversation
                        onlineUsers={onlineUsers}
                        conversation={conversation}
                        own={userInfo.id}
                        key={conversation._id}
                      ></Conversation>
                    </div>
                  ))
                : null}
            </div>
          </Grid>
          <Grid item xs={9} className={classes.width}>
            <div className={classes.chatContainer}>
              <div className={classes.chatContent}>
                {currentConversation.length !== 0 ? (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenArchives(true);
                    }}
                    className={classes.historyContainer}
                  >
                    <History />
                    <Typography className={classes.history} variant="body1">
                      Riwayat Percakapan
                    </Typography>
                  </div>
                ) : null}

                {userMessages === undefined ? (
                  <Alert className={classes.alert} severity="info">
                    Mulai percakapan
                  </Alert>
                ) : userMessages.length === 0 ? (
                  <Alert className={classes.alert} severity="info">
                    Pilih percakapan
                  </Alert>
                ) : userMessages ? (
                  userMessages.map((message) => (
                    <div ref={scrollRef} key={message._id}>
                      <Message
                        key={message._id}
                        own={message.sender === userInfo.id ? true : false}
                        message={message}
                        image={
                          message.sender === userInfo.id &&
                          currentConversation.length !== 0
                            ? currentConversation.participants[0]._id ===
                              userInfo.id
                              ? currentConversation.participants[0].imageUrl
                              : currentConversation.participants[1].imageUrl
                            : currentConversation.participants[0]._id ===
                              userInfo.id
                            ? currentConversation.participants[1].imageUrl
                            : currentConversation.participants[0].imageUrl
                        }
                      ></Message>
                    </div>
                  ))
                ) : (
                  <Alert className={classes.alert} severity="info">
                    Belum ada percakapan
                  </Alert>
                )}
              </div>
              <div className={classes.action}>
                <TextField
                  className={classes.messageInput}
                  id="message-input"
                  label="Tulis pesan anda"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></TextField>
                <div className={classes.sendButtonContainer}>
                  <Button
                    className={classes.sendButton}
                    disabled={currentConversation.length === 0}
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                  >
                    <Send />
                    Kirim
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ChatScreen;
