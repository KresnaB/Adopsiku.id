import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
  description:{
    fontSize: 18,
    marginBottom: theme.spacing(2)
  },
  completionBtn: {
    alignItems: 'center'
  }
}))