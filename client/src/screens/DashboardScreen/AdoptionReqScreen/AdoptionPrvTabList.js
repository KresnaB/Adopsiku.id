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
import AdoptionPrvTable from "./AdoptionPrvTable";

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

const AdoptionPrvTabList = () => {
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
            <AdoptionPrvTable/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdoptionPrvTable status={0}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdoptionPrvTable status={1}/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AdoptionPrvTable status={3}/>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <AdoptionPrvTable status={2}/>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <AdoptionPrvTable status={4}/>
          </TabPanel>
    </>
  );
};

export default AdoptionPrvTabList;
