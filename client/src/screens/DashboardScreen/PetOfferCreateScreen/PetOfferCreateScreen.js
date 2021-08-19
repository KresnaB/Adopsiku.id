import React, { useState, useEffect } from "react";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  LinearProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createOffer } from "../../../store/actions/petOfferActions";
import { PET_OFFER_CREATE_RESET } from "../../../constants/petOfferConstants";
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
import CatForm from "../../../component/PetOfferForm/Cat/CatForm";
import PetOfferType from "../../../component/PetOfferType/PetOfferType";
import formValidation from "../../Helper/formValidation";

// Step titles
const labels = ["Pilih Jenis Hewan", "Isi Data Hewan"];
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
    minLength: 2,
    maxLength: 500,
  },
  description: {
    error: "",
    minLength: 2,
    maxLength: 500,
  },
  media: {
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
  chirping: {},
  crow: {},
  furLength: {},
  spayedNeutered: {},
  vaccinated: {},
  trained: {},
};

const PetOfferCreateScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [petType, setType] = useState();
  const [error, setError] = useState({});
  const [petData, setPetData] = useState({
    name: "",
    gender: "",
    breeds: [],
    colors: [],
    age: 0,
    specialNeeds: "",
    description: "",
    media: [],
    source: "",
    adoptFee: 0,
    size: 0,
    chirping: "",
    furLength: "",
    spayedNeutered: false,
    vaccinated: false,
    trained: false,
    provider: userInfo.id,
  });

  const petOfferCreate = useSelector((state) => state.petOfferCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = petOfferCreate;

  useEffect(() => {
    console.log(successCreate);
    if (successCreate) {
      dispatch({ type: PET_OFFER_CREATE_RESET });
      history.push("/dashboard/pet");
    }
  }, [dispatch, history, successCreate]);

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle pet type
  const handleType = (event, newType) => {
    setType(newType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createOffer(petType, petData));
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
    setPetData({ ...petData, media: fileArray });
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <PetOfferType
            handleNext={handleNext}
            handleType={handleType}
            value={petType}
          />
        );
      case 1:
        switch (petType) {
          case "kucing":
            return (
              <CatForm
                handleNext={handleNext}
                handleChange={handleChange}
                petData={petData}
                error={error}
                colorChange={colorChange}
                handleBack={handleBack}
                breedChange={breedChange}
                handleFileUpload={handleFileUpload}
                handleSubmit={handleSubmit}
              />
            );
          case "anjing":
            return (
              <DogForm
                handleNext={handleNext}
                handleChange={handleChange}
                petData={petData}
                error={error}
                colorChange={colorChange}
                handleBack={handleBack}
                breedChange={breedChange}
                handleFileUpload={handleFileUpload}
                handleSubmit={handleSubmit}
              />
            );
          case "kelinci":
            return (
              <RabbitForm
                handleNext={handleNext}
                handleChange={handleChange}
                petData={petData}
                error={error}
                colorChange={colorChange}
                handleBack={handleBack}
                breedChange={breedChange}
                handleFileUpload={handleFileUpload}
                handleSubmit={handleSubmit}
              />
            );
          case "ikan":
            return (
              <FishForm
                handleNext={handleNext}
                handleChange={handleChange}
                petData={petData}
                error={error}
                colorChange={colorChange}
                handleBack={handleBack}
                breedChange={breedChange}
                handleFileUpload={handleFileUpload}
                handleSubmit={handleSubmit}
              />
            );
          case "burung":
            return (
              <BirdForm
                handleNext={handleNext}
                handleChange={handleChange}
                petData={petData}
                error={error}
                colorChange={colorChange}
                handleBack={handleBack}
                breedChange={breedChange}
                handleFileUpload={handleFileUpload}
                handleSubmit={handleSubmit}
              />
            );
          case "fury":
            return (
              <FuryForm
                handleNext={handleNext}
                handleChange={handleChange}
                petData={petData}
                error={error}
                colorChange={colorChange}
                handleBack={handleBack}
                breedChange={breedChange}
                handleFileUpload={handleFileUpload}
                handleSubmit={handleSubmit}
              />
            );
          case "turtle":
            return (
              <TurtleForm
                handleNext={handleNext}
                handleChange={handleChange}
                petData={petData}
                error={error}
                colorChange={colorChange}
                handleBack={handleBack}
                breedChange={breedChange}
                handleFileUpload={handleFileUpload}
                handleSubmit={handleSubmit}
              />
            );
          case "chicken":
            return (
              <ChickenForm
                handleNext={handleNext}
                handleChange={handleChange}
                petData={petData}
                error={error}
                colorChange={colorChange}
                handleBack={handleBack}
                breedChange={breedChange}
                handleFileUpload={handleFileUpload}
                handleSubmit={handleSubmit}
              />
            );
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Paper className={classes.container}>
        {loadingCreate && <LinearProgress />}
        {errorCreate && <Alert variant="danger">{errorCreate}</Alert>}
        <Typography className={classes.title} align="center">
          Buat Penawaran Hewan
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {labels.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {handleSteps(activeStep)}
      </Paper>
    </>
  );
};

export default PetOfferCreateScreen;
