import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import kucing from "../../images/Kucing.svg";
import anjing from "../../images/Anjing.svg";
import kelinci from "../../images/Kelinci.svg";
import burung from "../../images/Burung.svg";
import hamster from "../../images/Hamster.svg";
import ikan from "../../images/Ikan.svg";
import ular from "../../images/Ular.svg";
import lainnya from "../../images/Lainnya.svg";
import { Grid, Button } from "@material-ui/core";
import useStyles from "./styles";
import { ChevronRightRounded } from "@material-ui/icons";

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const PetOfferType = ({ handleNext, handleType, value }) => {
  const classes = useStyles();

  const type1 = [
    { name: kucing, type: "kucing" },
    { name: anjing, type: "anjing" },
    { name: kelinci, type: "kelinci" },
    { name: burung, type: "burung" },
    { name: hamster, type: "fury" },
    { name: ikan, type: "ikan" },
    { name: ular, type: "turtle" },
    { name: lainnya, type: "chicken" },
  ];

  return (
    <>
      <Grid className={classes.container} container>
        {type1.map((media) => (
          <Grid item md={3} xs={6}>
            <StyledToggleButtonGroup
              size="small"
              orientation="horizontal"
              value={value}
              exclusive
              onChange={handleType}
              aria-label="text alignment"
            >
              <ToggleButton key={media.type} value={media.type}>
                <img width="100%" src={media.name} alt="media"></img>
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Grid>
        ))}
      </Grid>
      <Grid className={classes.nextBtnContainer}>
        <Button
          className={classes.nextBtn}
          variant="contained"
          disabled={!value}
          color="primary"
          onClick={value ? handleNext : null}
        >
          Selanjutnya
        </Button>
        <IconButton
          className={classes.nextIcon}
          size="small"
          disabled={!value}
          onClick={value ? handleNext : null}
        >
          <ChevronRightRounded />
        </IconButton>
      </Grid>
    </>
  );
};

export default PetOfferType;
