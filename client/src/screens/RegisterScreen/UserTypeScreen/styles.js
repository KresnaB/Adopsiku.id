import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    grid:{
        [theme.breakpoints.up('sm')]:{
            marginTop: theme.spacing(10),
        },
        display: 'flex',
        flexDirection: 'column',
    },
    adopter:{
        [theme.breakpoints.up('lg')]:{
            paddingLeft: theme.spacing(35),
        },
    },
    provider:{
        [theme.breakpoints.up('lg')]:{
            paddingRight: theme.spacing(35),
        },
    },
    buttonLeft: {
        [theme.breakpoints.up('lg')]:{
            marginLeft: theme.spacing(35),
        },
        borderRadius: "5em",
        boxShadow: 'none',
        maxWidth: "20em",
        alignSelf: "center",
        fontWeight: 'bold',
    },
    buttonRight: {
        [theme.breakpoints.up('lg')]:{
            marginRight: theme.spacing(35),
        },
        borderRadius: "5em",
        boxShadow: 'none',
        maxWidth: "20em",
        alignSelf: "center",
        fontWeight: 'bold',
    },
    auth:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    space:{
        marginLeft: theme.spacing(1),
        textDecoration: 'none',
        color: 'black'
    },
}));
