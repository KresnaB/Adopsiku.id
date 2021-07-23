import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper:{
        width: "81%",
    },
    container:{
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(4)
    },
    gridContainer: {
        padding: theme.spacing(1)
    },
    radio:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('sm')]:{
            display: 'block',
            marginLeft: theme.spacing(0)
        },
    },
    title:{
        [theme.breakpoints.down('sm')]:{
            fontSize: 22,
        },
        fontWeight: "bold",
        marginTop: theme.spacing(2),
    },
    field:{
        width: "100%",
        [theme.breakpoints.up('sm')]:{
            fontSize: '10px'
        }
    },
    switchLabel:{
        marginTop: theme.spacing(1),
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    switchContainer: {
        [theme.breakpoints.up('sm')]:{
            display: 'flex',
            flexDirection: 'row',
        }
    },
    textPosision: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    errorMessage: {
        color: "red",
    },
    flexBoxSwitch: {
        display: 'flex',
        flexDirection: 'row',
    },
    nextBtnContainer: {
        display: 'flex', 
        margin: theme.spacing(1), 
        justifyContent: 'flex-end' 
    },
    submitBtn: {
        display: 'flex', 
        margin: theme.spacing(1), 
        justifyContent: 'center' 
    },
    label: {
        display: 'flex',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },  
    radioLabel: {
        fontSize: '10px'
    },
    nextBtn: {
        display: 'none',
        [theme.breakpoints.up('sm')]:{
            display: 'block'
        }
    },
    nextIcon: {
        display: 'block',
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.up('sm')]:{
            display: 'none'
        }
    }, 
}));