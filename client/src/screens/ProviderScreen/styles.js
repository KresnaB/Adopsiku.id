import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    providerAvatar: {
        width: '8rem',
        height: '8rem',
        margin:'auto'
    },
    container:{
        margin: theme.spacing(1)
    },
    grid1: {
        [theme.breakpoints.up('md')]:{
            paddingTop: '4rem',
        },
        paddingTop: '1rem'
    },
    value:{
        marginBottom: theme.spacing(1)
    },
    title:{
        fontWeight:'bold',
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('md')]:{
            fontSize: '16px',
        },
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
        paddingTop: '4rem',
    },
    card: {
        borderRadius: '1rem',
        backgroundColor: '#FFB822',
        height: '100%',
        width: '100%',
    },
    profileContainer:{
        margin:theme.spacing(1)
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