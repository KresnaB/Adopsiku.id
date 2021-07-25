import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // },
    fontWeight: "bold",
    textDecoration: "none",
    color: "black"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: "white",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  filterContainer: {
    marginLeft: theme.spacing(2),
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 7),
    backgroundColor: 'white',
    transition: theme.transitions.create("width"),
    // width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 300
    },
    [theme.breakpoints.down("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  auth: {
    // marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    borderRadius: "5em",
    boxShadow: 'none',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '30px',
      maxHeight: '30px',
      fontSize: 12,
    },
  },
  // register: {
  //   borderRadius: "5em",
  //   boxShadow: 'none',
  //   fontWeight: 'bold',
  //   [theme.breakpoints.down('xs')]: {
  //     maxWidth: '30px',
  //     maxHeight: '30px',
  //     fontSize: 12,
  //   },
  // },
  userName: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
    },
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: 0,
    },
    fontSize: 17
  },
  purple: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));