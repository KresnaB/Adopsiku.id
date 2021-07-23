import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import kucing from '../../../images/Kucing.svg';
import anjing from '../../../images/Anjing.svg';
import kelinci from '../../../images/Kelinci.svg';
import burung from '../../../images/Burung.svg';
import hamster from '../../../images/Hamster.svg';
import ikan from '../../../images/Ikan.svg';
import ular from '../../../images/Ular.svg';
import lainnya from '../../../images/Lainnya.svg';
import { Grid, Typography } from '@material-ui/core'
import useStyles from './styles';
import { Link } from 'react-router-dom';

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const CategorySearch = () => {
    const classes = useStyles()

    const type  = [
        {name: kucing, type: "Cat"},
        {name: anjing, type: "Dog"},
        {name: kelinci, type: "Rabbit"},
        {name: burung, type: "Bird"},
        {name: hamster, type: "Fury"},
        {name: ikan, type: "Fish"},
        {name: ular, type: "Turtle"},
        {name: lainnya, type: "Chicken"}
    ];

return (
    <>
        <Typography className={classes.title} textAlign="center" variant="h5" noWrap>
            Cari kategori hewan
        </Typography>
        <Grid className={classes.container} container>
            {type.map((media)=>
                <Grid item md={3} xs={6}>
                    <StyledToggleButtonGroup
                        size="small"
                        orientation="horizontal"
                        exclusive
                        aria-label="text alignment"
                    >
                        <ToggleButton key={media.type} value={media.type} component={Link} to={`search/result/${ media.type }`} >
                            <img width="100%" src={media.name} alt="media"></img>
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Grid>
            )}
        </Grid>
    </>
  );
}

export default CategorySearch;