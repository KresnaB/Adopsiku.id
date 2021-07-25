import React from "react";
import {
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  Grid,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import useStyles from "./styles";
import AdoptionTable from "../AdopterAdoptionList/AdoptionTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdoptionTabList = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid className={classes.container}>
      <AppBar position="static" className={classes.bar}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="simple tabs example">
          <Tab label="Semua" className={classes.label} {...a11yProps(0)} />
          <Tab label="Menunggu" className={classes.label} {...a11yProps(1)} />
          <Tab label="Dalam Diskusi" className={classes.label} {...a11yProps(2)} />
          <Tab label="Diterima" className={classes.label} {...a11yProps(3)} />
          <Tab label="Ditolak" className={classes.label} {...a11yProps(4)} />
          <Tab label="Dibatalkan" className={classes.label} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <AdoptionTable status={value === 0 ? "" : value}/>
    </Grid>
  );
};

export default AdoptionTabList;
