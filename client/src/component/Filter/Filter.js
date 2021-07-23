import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Button} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';

const Filter = ({ title, applyFilter, body }) => {

    const classes = useStyles();
    
    return(
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {body}
            <Grid className={classes.applyFilter}>
                <Button variant="contained" onClick={applyFilter}>Terapkan</Button>
            </Grid>
        </AccordionDetails>
    </Accordion>
)}

export default Filter;