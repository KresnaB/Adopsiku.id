import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    container:{
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        [theme.breakpoints.up('sm')]:{
            marginTop: theme.spacing(1),
        }
    },
    nextBtnContainer: {
        display:'flex',
        margin: theme.spacing(1), 
        justifyContent: 'flex-end' 
    },
    nextIcon: {
        display: 'block',
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.up('sm')]:{
            display: 'none'
        }
    }, 
    nextBtn: {
        display: 'none',
        [theme.breakpoints.up('sm')]:{
            display: 'block'
        }
    }
}));