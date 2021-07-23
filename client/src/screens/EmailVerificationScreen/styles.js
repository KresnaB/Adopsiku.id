import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  imgContainer: {
    marginTop: theme.spacing(12),
    justifyContent: 'center',
    textAlign: 'center' 
  },
  image: {
    width: '90%',
    height: '90%'
  },
  image2: {
    width: '70%',
    height: '70%'
  },
  captionContainer: {
    marginTop: theme.spacing(5)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  warning: {
    color: "#eb3434",
  }
}));
