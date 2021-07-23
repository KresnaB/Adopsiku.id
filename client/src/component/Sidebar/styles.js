import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]:{
            width: theme.spacing(6),
            height: theme.spacing(6),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
        [theme.breakpoints.up('lg')]:{
            width: theme.spacing(12),
            height: theme.spacing(12),
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(2),
        },
        
    },
    name:{
        [theme.breakpoints.up('sm')]:{
            fontSize: 22,
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: 12,
        },
    },
    dashMenu: {
        background: '#FFB822',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '17%',
        
        borderRadius: theme.spacing(1),
        //[theme.breakpoints.up('sm')]:{
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        //},
    },
    rating:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down('sm')]:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(0.5),
        boxShadow: 'none',
        fontWeight: 'bold',
        minWidth: '135px',
        minHeight: '45px',
        [theme.breakpoints.down('sm')]:{
            minWidth: '40px',
            minHeight: '40px',
        },
        [theme.breakpoints.up('lg')]:{
            minWidth: '190px',
            minHeight: '45px',
        },
        justifyContent: "flex-start",
        '&:hover': {
            backgroundColor: '#FFF3CE',
            color: '#FFB822',
        }
    },
    icon:{
        [theme.breakpoints.up('lg')]:{
            marginRight: theme.spacing(2),
        },
    },
    itemLabel:{
        [theme.breakpoints.down('sm')]:{
            display: 'none',
        },
        
    },
}));