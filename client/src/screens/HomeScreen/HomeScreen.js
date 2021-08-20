import React, { useEffect, useState } from "react";
import { Grid, Typography, ButtonGroup, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { listPetOffers } from "../../store/actions/petOfferActions";
import useStyles from "./styles";
import { Skeleton, Alert } from "@material-ui/lab";
import PetOffer from "../../component/PetOffer/PetOffer";
import Carousel from "../../component/Carousel/Carousel";
import MiniCarousel from "../../component/MiniCarousel/MiniCarousel";
import cat from "../../images/cat.jpg";
import rabbit from "../../images/rabbit.jpg";
import fish from "../../images/fish.jpg";
import bird from "../../images/bird.jpg";
import { useHistory } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  console.log(history);
  const petOfferList = useSelector((state) => state.petOfferList);
  const { loading, error, petOffers, pageCount, totalPage } = petOfferList;

  const [page, setPage] = useState(pageCount || 0);
  const [query, setQuery] = useState(`?page=${page}`);

  useEffect(() => {
    dispatch(listPetOffers(query, history));
  }, [dispatch, query]);

  const handleChange = (change) => {
    if (page + change >= 0) {
      setPage(page + change);
      setQuery(`?page=${page + change}`);
    }
  };

  const items = [
    {
      name: "Kitty",
      image: cat,
    },
    {
      name: "Bunny",
      image: rabbit,
    },
    {
      name: "Ikan Hias",
      image: fish,
    },
    {
      name: "Kakaktua",
      image: bird,
    },
  ];

  return (
    <>
      <div className={classes.carousel}>
        <Carousel />
      </div>
      <div className={classes.miniCarousel}>
        <MiniCarousel items={items} />
      </div>
      {loading ? (
        <div className={classes.content}>
          <Grid className={classes.container} container>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
          </Grid>
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div className={classes.content}>
          <Typography className={classes.title} variant="h6">
            Penawaran Adopsi Terbaru
          </Typography>
          <Grid className={classes.container} container spacing={1}>
            {petOffers.map((petOffer) => (
              <Grid key={petOffer._id} item xs={6} sm={4} md={3} lg={2} xl={2}>
                <PetOffer petOffer={petOffer} />
              </Grid>
            ))}
          </Grid>
          <ButtonGroup
            className={classes.buttonGroup}
            color="primary"
            aria-label="outlined secondary button group"
          >
            {page !== 0 && (
              <Button
                className={classes.pageButton}
                onClick={() => handleChange(-1)}
              >
                Previous
              </Button>
            )}
            {page + 1 <= totalPage && (
              <Button
                className={classes.pageButton}
                onClick={() => handleChange(0)}
              >
                {page + 1}
              </Button>
            )}
            {page + 2 <= totalPage && (
              <Button
                className={classes.pageButton}
                onClick={() => handleChange(1)}
              >
                {page + 2}
              </Button>
            )}
            {page + 3 <= totalPage && (
              <Button
                className={classes.pageButton}
                onClick={() => handleChange(2)}
              >
                {page + 3}
              </Button>
            )}
            {page + 4 <= totalPage && (
              <Button
                className={classes.pageButton}
                onClick={() => handleChange(3)}
              >
                {page + 4}
              </Button>
            )}
            {page !== totalPage - 1 && (
              <Button
                className={classes.pageButton}
                onClick={() => handleChange(1)}
              >
                Next
              </Button>
            )}
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
