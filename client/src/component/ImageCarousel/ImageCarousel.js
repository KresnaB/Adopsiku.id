import React from "react";
import Carousel from "react-material-ui-carousel";
import useStyles from "./styles";

import { CardMedia, Grid, Paper } from "@material-ui/core";

const ImageCarousel = (props) => {
  const classes = useStyles();
  const items = props.items;

  const Banner = (props) => {
    return <CardMedia className={classes.media} image={props.item}></CardMedia>;
  };

  return (
    <Grid className={classes.container} container>
      <Grid item xs={12} sm={10} md={8} className={classes.containerItem}>
        <Paper className={classes.paper}>
          <Carousel>
            {items.map((item, index) => {
              return <Banner item={item} key={index} />;
            })}
          </Carousel>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ImageCarousel;
