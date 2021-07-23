import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    tableActionButton: {
        width: "27px",
        height: "27px",
        padding: "0",
    },
    tableActionButtonIcon: {
        width: "17px",
        height: "17px",
    },
    edit: {
        color: "#66bb6a",
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    close: {
        color: "#f44336",
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    statusLabel: {
        fontSize: "12px",
        color: "white",
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        },
    },
    statusIcon: {
        backgroundColor: "transparent",
        display: 'none',
        [theme.breakpoints.down('sm')]:{
            display: 'block',
        },
    },
    media: {
        height: '4rem',
        width: '4rem',
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },    
    grid: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
    },
    hide: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    display: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '13px'
        },
    },
    detailTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    value: {
        fontSize: '14px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1)
        },
    },
    detailComponent: {
        marginBottom: theme.spacing(2),        
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(0)
        },
    }
  }));
  