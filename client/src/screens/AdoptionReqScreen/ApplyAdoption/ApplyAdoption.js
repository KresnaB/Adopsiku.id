import React, { useState, useEffect } from "react";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  LinearProgress,
  Container,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import formValidation from "../../Helper/formValidation";
import HouseCondition from "../../../component/AdoptionForm/HouseCondition";
import Commitment from "../../../component/AdoptionForm/Commitment";
import Experience from "../../../component/AdoptionForm/Experience";
import { ADOPTION_REQUEST_CREATE_RESET } from "../../../constants/adoptionRequestConstants";
import { applyAdoption } from "../../../store/actions/adoptionRequestActions";
import { viewProfile } from "../../../store/actions/userActions";
import { identityChecking, applying }  from './IdentityChecking';
import { listPetOfferDetails } from "../../../store/actions/petOfferActions";

// Step titles
const labels = ["Kondisi Rumah", "Komitmen", "Pengalaman Mengadopsi"];
const fieldsValidation = {
  outdoors: {
    error: "",
    validate: "array",
  },
  housePhotos: {
    error: "",
    validate: "array",
  },
  houseType: "",
  houseSize: "",
  familyApproval: "",
  movingPlan: "",
  weddingPlan: "",
  childPlan: "",
  financialPlan: "",
  wasAdopting: "",
  currentPet: "",
};

const ApplyAdoption = ({ id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState({});
  const profile = useSelector(state => state.userProfile.userInfo);
  const [adoptionData, setAdoptionData] = useState({
    pet: id,
    adopter: userInfo.id,
    houseCondition: {
      houseType: "",
      houseSize: "",
      outdoors: [],
      housePhotos: [],
    },
    commitment: {
      familyApproval: false,
      movingPlan: false,
      weddingPlan: false,
      childPlan: false,
      financialPlan: false,
    },
    experience: {
      wasAdopting: false,
      currentPet: "",
    },
  });

  const adoptionReq = useSelector((state) => state.adoptionReqCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = adoptionReq;

  const petOfferDetails = useSelector((state) => state.petOfferDetails);
  const { petOffer, adopter } = petOfferDetails;
  let applied;
  useEffect(() => {
    if(!profile) dispatch(viewProfile(userInfo.id));
  }, [dispatch, userInfo, profile])

  useEffect(() => {
    if(!petOffer) dispatch(listPetOfferDetails(id));
  }, [dispatch, id, petOffer]);

  useEffect(() => {
    if(petOffer.status !== 0){
      history.push(`/petoffer/${id}`)
    }else{
      if(userInfo?.role !== "Adopter"){
        history.push('/')
      }else{
        if(adopter){
          applied = applying(adopter, userInfo.id, petOffer.status)
          if(applied){
            history.push(`/petoffer/${id}`)
          }
        }
        if(profile){
          if(!identityChecking(profile)){
            history.push('/profilecompletions')
          }
        }
      }
    }
  }, [profile, history, userInfo, petOffer, id, adopter])

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: ADOPTION_REQUEST_CREATE_RESET });
      history.push("/dashboard/pet");
    }
  }, [dispatch, history, successCreate]);

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(applyAdoption(adoptionData));
  };

  const handleChange = (e, step) => {
    let { name, value, checked } = e.target;

    switch (step) {
      case 1:
        setAdoptionData({
          ...adoptionData,
          houseCondition: { ...adoptionData.houseCondition, [name]: value },
        });
        break;
      case 2:
        setAdoptionData({
          ...adoptionData,
          commitment: { ...adoptionData.commitment, [name]: checked },
        });
        break;
      case 3:
        if (name === "wasAdopting") {
          setAdoptionData({
            ...adoptionData,
            experience: { ...adoptionData.experience, [name]: checked },
          });
          break;
        } else {
          setAdoptionData({
            ...adoptionData,
            experience: { ...adoptionData.experience, [name]: value },
          });
          break;
        }
      default:
        break;
    }

    const error = formValidation(name, value, fieldsValidation) || "";

    setError({
      [name]: error,
    });
  };

  const outdoorChange = (value) => {
    setAdoptionData({
      ...adoptionData,
      houseCondition: { ...adoptionData.houseCondition, outdoors: value },
    });
  };

  const handleFileUpload = (fileArray) => {
    if (fileArray.length > 5) {
      fileArray.length = 5;
    }
    setAdoptionData({
      ...adoptionData,
      houseCondition: {
        ...adoptionData.houseCondition,
        housePhotos: fileArray,
      },
    });
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <HouseCondition
            handleChange={handleChange}
            houseCondition={adoptionData.houseCondition}
            handleFileUpload={handleFileUpload}
            outdoorChange={outdoorChange}
            error={error}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <Commitment
            handleChange={handleChange}
            commitment={adoptionData.commitment}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <Experience
            handleChange={handleChange}
            experience={adoptionData.experience}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        );
      default:
        break;
    }
  };

  return (
    <Container component="main" maxWidth="md">
      {loadingCreate && <LinearProgress />}
      {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>} 
      <Paper className={classes.paper} elevation={3}>
          <>      
            <Typography className={classes.title} align="center">
              Buat Pengajuan Adopsi
            </Typography>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
            >
              {labels.map((label) => (
                <Step key={label}>
                  <StepLabel >{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {handleSteps(activeStep)}
          </>
      </Paper>
    </Container>
  );
};

export default ApplyAdoption;
