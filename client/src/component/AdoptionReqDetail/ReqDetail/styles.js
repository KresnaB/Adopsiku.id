import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    // marginBottom: theme.spacing(0.5),
  },  
  value: {
    fontSize: 15,
    // marginBottom: theme.spacing(0.5),
    [theme.breakpoints.up('xs')]:{
      marginBottom: theme.spacing(1),
    }
  }
}))