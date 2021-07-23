import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    grid:{
        flexDirection: 'column',
        marginTop: theme.spacing(10)
    },
    image:{
        alignItem: 'center',
        height: '85%',
        width: '85%',
    },
    quote: {
        padding: theme.spacing(5),
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 32,
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(15),
        }
    },
    button: {
        marginBottom: theme.spacing(5),
        borderRadius: "5em",
        boxShadow: 'none',
    },
}));