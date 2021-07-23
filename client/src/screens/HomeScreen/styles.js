import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    alignItems: 'stretch',
    padding: theme.spacing(2),
  },
  mediaSkeleton:{
    [theme.breakpoints.down('xs')]: {
      width: 160,
      height: 90,
    },
    [theme.breakpoints.up('sm')]: {
      width: 270,
      height: 130,
    },
  },
  containerRoot : {
    maxWidth: "100%",
  },
  title : {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
  },
  pageButton: {
    backgroundColor: '#FFB822',
    color: 'black',
    '&:hover': {
      backgroundColor: '#FFF3CE',
    }
  },
  buttonGroup: {
    marginLeft: '1rem',
    display: 'flex', 
    margin: theme.spacing(1), 
    justifyContent: 'center' 
  },
  carousel: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },    
  },
  miniCarousel: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    },    
  }
}));