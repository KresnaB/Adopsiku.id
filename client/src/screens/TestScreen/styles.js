import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        width: '80%',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    title: {
        fontWeight: 'bold',
        margin: theme.spacing(1)
    },
}));