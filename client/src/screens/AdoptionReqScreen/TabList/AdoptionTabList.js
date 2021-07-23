import React from "react";
import {
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
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
    <>
          <AppBar position="static" className={classes.bar}>
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="simple tabs example">
              <Tab label="Semua" {...a11yProps(0)} />
              <Tab label="Menunggu" {...a11yProps(1)} />
              <Tab label="Dalam Diskusi" {...a11yProps(2)} />
              <Tab label="Diterima" {...a11yProps(3)} />
              <Tab label="Ditolak" {...a11yProps(4)} />
              <Tab label="Dibatalkan" {...a11yProps(5)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <AdoptionTable/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdoptionTable status={0}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdoptionTable status={1}/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AdoptionTable status={3}/>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <AdoptionTable status={2}/>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <AdoptionTable status={4}/>
          </TabPanel>
    </>
  );
};

export default AdoptionTabList;
