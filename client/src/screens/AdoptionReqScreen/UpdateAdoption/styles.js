import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    title: {
        fontWeight: 'bold',
        margin: theme.spacing(1),
        fontSize: '18px'
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "200px"
    },  
    paper: {
        marginTop: theme.spacing(10),
        alignItems: 'center',
        padding: theme.spacing(5),
      },
}));