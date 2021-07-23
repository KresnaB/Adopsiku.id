import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  paperProfile: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  photoProfile: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  join: {
    fontSize: 15,
    marginBottom: theme.spacing(1),
  },  
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
  },
  // root: {
  //   '& .MuiTextField-root': {
  //     margin: theme.spacing(1),
  //   },
  // },
  auth: {
    borderRadius: "5em",
    boxShadow: 'none',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "200px"
  },  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: theme.spacing(2),
  },
}))