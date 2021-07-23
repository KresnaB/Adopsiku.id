import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import useStyles from './styles';
import { useDispatch } from 'react-redux';

const Conversation = ({ conversation, currentUser }) => {
    const dispatch = useDispatch();
    // const classes = useStyles();
    const [friendProfile, setFriendProfile] = useState();

      useEffect(() => {
        const friend = conversation.participants.find((m) => m._id !== currentUser.id);
        setFriendProfile(friend)
      }, [dispatch, currentUser, conversation, friendProfile]);

    return (
        <ListItem >
            <ListItemIcon>
                <Avatar variant="rounded" alt={friendProfile?.name} src={friendProfile?.imageUrl}></Avatar>
            </ListItemIcon>
            <ListItemText primary={friendProfile?.name}></ListItemText>
        </ListItem>  
    );
}

export default Conversation;