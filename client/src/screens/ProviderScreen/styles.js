import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    providerAvatar: {
        // margin: 'auto',
        width: '8rem',
        height: '8rem',
        marginLeft: theme.spacing(2)
    },
    grid1: {
        textAlign: 'center',
        margin: 'auto',
        paddingTop: '5rem',
    },
    grid2: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        [theme.breakpoints.up('md')]:{
            paddingTop:'2rem',
            paddingLeft: '15rem',
            paddingRight: '15rem',
        }
    },
    paper: {
        padding: '2rem',
        backgroundColor: '#FFB822',
    },
    grid3: {
        textAlign: 'center',
        margin: 'auto',
        padding: theme.spacing(1)
    },
    card: {
        borderRadius: '1rem',
        backgroundColor: '#FFB822',
        height: '100%',
        width: '100%',
    },
    media: {
        height: '3rem',
        [theme.breakpoints.up('md')]:{
            height: '5rem',
        },
        paddingTop: '60%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "300px"
    },
}))