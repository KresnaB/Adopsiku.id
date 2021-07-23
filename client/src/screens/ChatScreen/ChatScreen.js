import React, { useState, useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserConversations, sendMessage } from '../../store/actions/conversationActions';
import Conversation from '../../component/ChatComponent/Conversation/Conversation';
import { Alert, Button, CircularProgress } from '@material-ui/core';
import Message from '../../component/ChatComponent/Message/Message';
import { io } from "socket.io-client"


const Chat = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const conversationList = useSelector((state) => state.conversationList)
    const { conversations, loading, error } = conversationList

    const messageCreate = useSelector((state) => state.messageCreate)
    const { message: messages } = messageCreate

    const [currentChat, setCurrentChat] = useState()
    const [currentConversation, setCurrentConversation] = useState()
    const [message, setMessage] = useState();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();

    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
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
        socket.current.emit("addUser", userInfo.id);
        socket.current.on("getUsers", (users) => {
            console.log(users)
        //   setOnlineUsers(
        //       conversations.map((conversation) => 
        //         conversation.participants.filter((onlineUser) => onlineUser !== userInfo.id && users.some((u) => u.userId === onlineUser))
        //       )
        //   );
        });
      }, [userInfo, conversations]);

    useEffect(() => {
        if(conversations === undefined){
            dispatch(getUserConversations(userInfo.id))
        }
    }, [dispatch, userInfo, conversations])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [currentChat])


    useEffect(() => {
        if(messages){
            if(currentChat) {
                setCurrentChat([...currentChat, messages.message])
            }
        }
    }, [messages])

    useEffect(() => {
        if(arrivalMessage){
            const currentPeople = currentConversation?.participants.filter((part)=>arrivalMessage.sender === part._id)
            if(currentChat && currentPeople) {
                setCurrentChat([...currentChat, arrivalMessage])
            }
        }
    }, [arrivalMessage])

    const handleSendMessage = (e) => {
        e.preventDefault()
        const receiverId = currentConversation.participants.find(
            (participant) => participant._id !== userInfo.id
        );

        const newMessage = {
            sender: userInfo.id,
            receiver: receiverId._id,
            content: message
        }
        socket.current.emit("sendMessage", {
            senderId: userInfo.id,
            receiverId: receiverId._id,
            text: message,
          });

        dispatch(sendMessage(currentConversation._id, newMessage))
        setMessage("")
    }

    return (
      <div>
        {loading === undefined || loading ? (
            <div className={classes.loading}>
            <CircularProgress />
            </div>
        ) : error ? (
            <Alert severity="error">{error}</Alert>
        ) : (
            <>
            <Grid container>
                <Grid item >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                            <Avatar variant="rounded" alt={userInfo?.name} src={userInfo?.imageUrl}></Avatar>
                            </ListItemIcon>
                            <ListItemText primary={userInfo.name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    {conversations ?
                        conversations.map((conversation) => 
                            <Button onClick={() => {setCurrentChat(conversation.messages); setCurrentConversation(conversation)}}>
                                <Conversation key = {conversation._id} conversation = {conversation} currentUser = {userInfo} />
                            </Button>
                        ):null
                    }
                </Grid>
                <Grid item xs={9}>
                    {currentChat ?
                        <>
                            <List className={classes.messageArea}>
                                {currentChat.map((chat)=>
                                    <div ref = {scrollRef}>
                                        <ListItem key={chat._id}>
                                            <Message message={chat} own={chat.sender === userInfo.id}/>
                                        </ListItem>
                                    </div>
                                )}
                            </List>
                            <Divider />
                            <Grid container style={{padding: '20px'}}>
                                <Grid item xs={11}>
                                    <TextField className={classes.field} value={message} size="small" name="message" rows={4} fullWidth multiline variant="outlined" label="Type Something..." onChange={(e) => setMessage(e.target.value)}/>
                                </Grid>
                                <Grid item xs={1} align="right">
                                    <Fab color="primary" aria-label="add" onClick={handleSendMessage}><SendIcon /></Fab>
                                </Grid>
                            </Grid>
                        </>
                    :
                        <Typography>
                            Buka percakapan untuk memulai chat
                        </Typography>
                    }
                </Grid>
            </Grid>
        </>
        )}
      </div>
  );
}

export default Chat;