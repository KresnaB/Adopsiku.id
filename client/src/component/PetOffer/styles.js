import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  border: {
    border: 'solid',
  },
  card: {
    borderRadius: '1rem',
    backgroundColor: '#FFB822',
    height: '100%',
  },
  name: {
    fontWeight: 'bold',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
  },
});
