import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    carouselContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('md')]:{
            display: 'none'
        },    
    },  
    miniCarousel: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'block'
        },    
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    carousel: {
        display: 'flex',
        flexDirection: 'row',
    },
    slider:{
        width:'700px',
        height:'350px',
        [theme.breakpoints.down('sm')]:{
            width:'400px',
            height:'200px',
        },    
        [theme.breakpoints.up('lg')]:{
            width:'700px',
            height:'350px',
        },
    },
    button:{
        boxShadow: 'none',
        fontWeight: 'bold',
        minWidth: '80px',
        minHeight: '45px',
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        },
        border: '0px',
        backgroundColor: '#FFB822',
        padding: '0px',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },
    card1: {
        margin: theme.spacing(2),
        [theme.breakpoints.up('lg')]:{
            margin: theme.spacing(5),
        },
    },
    card2: {
        margin: theme.spacing(2),
        [theme.breakpoints.up('lg')]:{
            margin: theme.spacing(5),
        },
        backgroundColor: '#FFB822',
    },
    title: {
        fontWeight: 'bold',
    },
    subTitle1: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    subTitle2: {
        fontWeight: 'bold',
        color: '#FFB822',
    },
    subTitle3: {
        fontWeight: 'bold',
        marginTop: theme.spacing(2),
        // textAlign: 'center'
    },
    body1: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '2px solid gray',
        borderBottom: '2px solid gray',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    body2: {
        borderTop: '2px solid gray',
        borderBottom: '2px solid gray',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button2:{
        boxShadow: 'none',
        fontWeight: 'bold',
        minWidth: '200px',
        minHeight: '45px',
        border: '0px',
        borderRadius: "5em",
        backgroundColor: theme.palette.secondary.main,
        marginTop: theme.spacing(2),
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
        },
        color: 'black'
    },
    char: {
        marginRight: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderRight: '1px solid black'
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'row',
    },
    provContainer: {
        padding: '0.5rem',
        backgroundColor: '#FFF3CE',
        width: '100%',
    },
    provider: {
        textDecoration: 'none',
        color: 'black'
    },
    avatar: {
        marginRight: '0.5rem',
        width: '3rem',
        height: '3rem',
    },
    providerName: {
        marginTop: '0.5rem',
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "300px"
    },  
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(9)
      },
    address: {
        marginLeft: theme.spacing(1)
    }
}))