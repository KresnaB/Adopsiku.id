import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    title:{
        [theme.breakpoints.up('sm')]:{
            marginTop: theme.spacing(10),
        },
        [theme.breakpoints.down('sm')]:{
            marginTop: theme.spacing(2),
        },
    },
    grid:{
        [theme.breakpoints.up('sm')]:{
            marginTop: theme.spacing(5),
        },
        [theme.breakpoints.down('sm')]:{
            marginTop: theme.spacing(2),
        },
    },
    imageIndividual:{
        [theme.breakpoints.up('lg')]:{
            paddingLeft: theme.spacing(35),
        },
    },
    imageOrganization:{
        [theme.breakpoints.up('lg')]:{
            paddingRight: theme.spacing(35),
        },
    }
}));
