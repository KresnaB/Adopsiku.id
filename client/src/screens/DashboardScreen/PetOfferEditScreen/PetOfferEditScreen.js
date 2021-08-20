import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import CatForm from "../../../component/PetOfferForm/Cat/CatForm";
import formValidation from "../../Helper/formValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  listPetOfferDetails,
  updatePetOffer,
} from "../../../store/actions/petOfferActions";
import { PET_OFFER_UPDATE_RESET } from "../../../constants/petOfferConstants";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import DogForm from "../../../component/PetOfferForm/Dog/DogForm";
import RabbitForm from "../../../component/PetOfferForm/Rabbit/RabbitForm";
import FishForm from "../../../component/PetOfferForm/Fish/FishForm";
import BirdForm from "../../../component/PetOfferForm/Bird/BirdForm";
import FuryForm from "../../../component/PetOfferForm/Fury/FuryForm";
import TurtleForm from "../../../component/PetOfferForm/Turtle/TurtleForm";
import ChickenForm from "../../../component/PetOfferForm/Chicken/ChickenForm";

const fieldsValidation = {
  name: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20,
  },
  gender: {},
  breeds: {
    error: "",
    validate: "array",
  },
  colors: {
    error: "",
    validate: "array",
  },
  age: {},
  specialNeeds: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 1000,
  },
  description: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 1000,
  },
  photos: {
    error: "",
    validate: "array",
  },
  source: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20,
  },
  adoptFee: {},
  size: {},
  crow: {},
  chirping: {},
  furLength: {},
  spayedNeutered: {},
  vaccinated: {},
  trained: {},
};

const PetOfferEditScreen = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [petData, setPetData] = useState({});
  const [petType, setPetType] = useState({});
  const [error, setError] = useState({});
  const petOfferDetails = useSelector((state) => state.petOfferDetails);
  const {
    loading: loadingDetail,
    error: errorDetail,
    petOffer,
  } = petOfferDetails;

  const petOfferUpdate = useSelector((state) => state.petOfferUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = petOfferUpdate;

  let formComponent;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PET_OFFER_UPDATE_RESET });
      history.push("/dashboard/pet");
    } else {
      if (
        petOffer === undefined ||
        petOffer._id === undefined ||
        !petOffer._id ||
        petOffer._id !== id
      ) {
        dispatch(listPetOfferDetails(id));
      } else {
        setPetData(petOffer);
        setPetType(petOffer.category);
      }
    }
  }, [dispatch, history, id, petOffer, successUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(petData);
    dispatch(updatePetOffer(id, petType, petData));
  };

  const breedChange = (value) => {
    if (value.length > 1) {
      const temp = value.length - 1;
      for (let i = 1; i < temp; i++) {
        value.pop();
      }
      setPetData({ ...petData, breeds: value });
    } else {
      setPetData({ ...petData, breeds: value });
    }
  };

  const colorChange = (value) => {
    if (value.length > 2) {
      const temp = value.length - 2;
      for (let i = 1; i < temp; i++) {
        value.pop();
      }
      setPetData({ ...petData, colors: value });
    } else {
      setPetData({ ...petData, colors: value });
    }
  };

  const handleChange = (e) => {
    let { name, value, checked, type } = e.target;
    if (type === "number") {
      let min, max;
      if (name === "size") {
        min = 1;
        max = 20;
      } else if (name === "age") {
        min = 1;
        max = 240;
      } else if (name === "adoptFee") {
        min = 0;
        max = 1000000;
      }
      if (parseInt(value) < min) {
        value = min;
      }
      if (parseInt(value) > max) {
        value = max;
      }
      setPetData({ ...petData, [name]: parseInt(value) });
    } else {
      name === "spayedNeutered" || name === "vaccinated" || name === "trained"
        ? setPetData({ ...petData, [name]: checked })
        : setPetData({ ...petData, [name]: value });
    }

    const error = formValidation(name, value, fieldsValidation) || "";

    setError({
      [name]: error,
    });
  };

  const handleFileUpload = (fileArray) => {
    if (fileArray.length > 3) {
      fileArray.length = 3;
    }
    setPetData({ ...petData, photos: fileArray });
  };

  if (petType) {
    switch (petType) {
      case "Cat":
        formComponent = (
          <CatForm
            handleChange={handleChange}
            petData={petData}
            error={error}
            colorChange={colorChange}
            breedChange={breedChange}
            handleFileUpload={handleFileUpload}
            handleSubmit={handleSubmit}
          />
        );
        break;
      case "Dog":
        formComponent = (
          <DogForm
            handleChange={handleChange}
            petData={petData}
            error={error}
            colorChange={colorChange}
            breedChange={breedChange}
            handleFileUpload={handleFileUpload}
            handleSubmit={handleSubmit}
          />
        );
        break;
      case "Rabbit":
        formComponent = (
          <RabbitForm
            handleChange={handleChange}
            petData={petData}
            error={error}
            colorChange={colorChange}
            breedChange={breedChange}
            handleFileUpload={handleFileUpload}
            handleSubmit={handleSubmit}
          />
        );
        break;
      case "Fish":
        formComponent = (
          <FishForm
            handleChange={handleChange}
            petData={petData}
            error={error}
            colorChange={colorChange}
            breedChange={breedChange}
            handleFileUpload={handleFileUpload}
            handleSubmit={handleSubmit}
          />
        );
        break;
      case "Bird":
        formComponent = (
          <BirdForm
            handleChange={handleChange}
            petData={petData}
            error={error}
            colorChange={colorChange}
            breedChange={breedChange}
            handleFileUpload={handleFileUpload}
            handleSubmit={handleSubmit}
          />
        );
        break;
      case "Fury":
        formComponent = (
          <FuryForm
            handleChange={handleChange}
            petData={petData}
            error={error}
            colorChange={colorChange}
            breedChange={breedChange}
            handleFileUpload={handleFileUpload}
            handleSubmit={handleSubmit}
          />
        );
        break;
      case "Turtle":
        formComponent = (
          <TurtleForm
            handleChange={handleChange}
            petData={petData}
            error={error}
            colorChange={colorChange}
            breedChange={breedChange}
            handleFileUpload={handleFileUpload}
            handleSubmit={handleSubmit}
          />
        );
        break;
      case "Chicken":
        formComponent = (
          <ChickenForm
            handleChange={handleChange}
            petData={petData}
            error={error}
            colorChange={colorChange}
            breedChange={breedChange}
            handleFileUpload={handleFileUpload}
            handleSubmit={handleSubmit}
          />
        );
        break;
      default:
        break;
    }
  }
  return (
    <>
      {loadingUpdate && <LinearProgress />}
      {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
      {loadingDetail ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : errorDetail ? (
        <Alert variant="danger">{errorDetail}</Alert>
      ) : (
        <>
          <Paper className={classes.container}>
            <Typography className={classes.title} align="center">
              Edit Penawaran Hewan
            </Typography>
            {formComponent}
          </Paper>
        </>
      )}
    </>
  );
};

export default PetOfferEditScreen;
