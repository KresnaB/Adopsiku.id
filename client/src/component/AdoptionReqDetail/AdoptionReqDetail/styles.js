import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    // marginBottom: theme.spacing(0.5),
  },      
  media: {
    height: '4rem',
    width: '4rem',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
},    
grid: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
},
}))