import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    tablePaper: {
        margin: theme.spacing(1)
    },
    bar:{
        backgroundColor: 'white',
        borderBottom:'solid black 1px'
    },
    label:{
        fontWeight:'bold',
        textTransform:'none'
    },
    container:{
        margin:theme.spacing(2)
    }
}));