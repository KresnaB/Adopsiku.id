import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const PetOffer = ({ petOffer }) => {
  const classes = useStyles();

  return (
    <>
      <Link to={`/petoffer/${petOffer._id}`} className={classes.link}>
        <Card className={classes.card}>
          <CardMedia>
            <CardMedia
              className={classes.media}
              image={
                petOffer.photos[0] ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
            />
          </CardMedia>
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.name}
              variant="h6"
              color="textSecondary"
              component="p"
            >
              {petOffer.name}
            </Typography>
            <Typography
              className={classes.name}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {petOffer.category}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Typography variant="caption" color="textSecondary" component="p">
              {petOffer.adoptFee === 0
                ? "Adopsi gratis"
                : "Rp." + petOffer.adoptFee}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {petOffer.gender ? "Jantan" : "Betina"}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {petOffer.age}&nbsp;Bulan
            </Typography>
          </CardActions>
        </Card>
      </Link>
    </>
  );
};

export default PetOffer;
