import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    padding: 0,
    margin:0
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]:{
      padding: theme.spacing(0),
    },
  },
}));