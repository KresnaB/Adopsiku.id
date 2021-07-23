import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 230;
export default makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        [theme.breakpoints.down('sm')]:{
            width: 57
        },
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.down('sm')]:{
            width: 57
        },
        backgroundColor: theme.palette.primary.main
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(0.5),
        boxShadow: 'none',
        fontWeight: 'bold',
        minWidth: '180px',
        minHeight: '45px',
        [theme.breakpoints.down('sm')]:{
            minWidth: '10px',
            minHeight: '40px',
            marginLeft: theme.spacing(0),
            marginRight: theme.spacing(0)
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
        [theme.breakpoints.up('sm')]:{
            margin: theme.spacing(0),
        },
    },
    itemLabel:{
        [theme.breakpoints.down('sm')]:{
            display: 'none',
        },
        marginLeft:theme.spacing(1)
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]:{
            width: theme.spacing(5),
            height: theme.spacing(5),
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
    name: {
        [theme.breakpoints.down('sm')]:{
            display: 'none',
        },
    }
}));