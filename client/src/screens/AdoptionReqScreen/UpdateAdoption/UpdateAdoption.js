import React, { useState, useEffect } from "react";
import { Typography, Stepper, Step, StepLabel, Paper, LinearProgress, CircularProgress, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import formValidation from '../../Helper/formValidation';
import HouseCondition from "../../../component/AdoptionForm/HouseCondition";
import Commitment from "../../../component/AdoptionForm/Commitment";
import Experience from "../../../component/AdoptionForm/Experience";
import { ADOPTION_REQUEST_UPDATE_RESET } from '../../../constants/adoptionRequestConstants'
import { updateAdoption, viewAdoptionDetail } from "../../../store/actions/adoptionRequestActions";

// Step titles
const labels = ["Kondisi Hewan", "Komitmen", "Pengalaman Mengadopsi"];
const fieldsValidation = {
  outdoors: {
    error: "",
    validate: "array"
  },
  housePhotos: {
    error: "",
    validate: "array"
  },
  houseType: '',
  houseSize: '',
  familyApproval: '',
  movingPlan: '',
  weddingPlan: '',
  childPlan: '',
  financialPlan: '',
  wasAdopting: '',
  currentPet: ''
};

const UpdateAdoption = ({ id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState({});
  const [adoptionData, setAdoptionData] = useState(null)

  const adoptionReqDetail = useSelector((state) => state.adoptionReqDetail)
  const { loading: loadingDetail, error: errorDetail, adoptionReq } = adoptionReqDetail

  const adoptionReqUpdate = useSelector((state) => state.adoptionReqUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = adoptionReqUpdate
  
    useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADOPTION_REQUEST_UPDATE_RESET })
      history.push('/adoptions')
    } else {
      if (adoptionReq === undefined||adoptionReq==={}||adoptionReq._id === undefined ||!adoptionReq._id || adoptionReq._id !== id) {
        dispatch(viewAdoptionDetail(id))
      } else {
        console.log(adoptionReq)
        setAdoptionData(adoptionReq);
      }
    }
  }, [dispatch, history, id, adoptionReq, successUpdate])

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateAdoption(id, adoptionData))
  };

  const handleChange = (e, step) => {
    let { name, value, checked } = e.target;

    switch(step)
    {
      case 1:     
        setAdoptionData({ ...adoptionData, houseCondition: { ...adoptionData.houseCondition, [name]: value } }); break;
      case 2: 
        setAdoptionData({ ...adoptionData, commitment: { ...adoptionData.commitment, [name]: checked } }); break;
      case 3:
        if(name === "wasAdopting"){ 
          setAdoptionData({ ...adoptionData, experience: { ...adoptionData.experience, [name]: checked } }); break;
        }else{
          setAdoptionData({ ...adoptionData, experience: { ...adoptionData.experience, [name]: value } }); break;
        }
      default: break;      
    }

    const error = formValidation(name, value, fieldsValidation) || "";

    setError({
      [name]: error
    });
  };

  const outdoorChange = (value) => { setAdoptionData({ ...adoptionData, houseCondition: { ...adoptionData.houseCondition, outdoors: value } })}

  const handleFileUpload = (fileArray) => {
    if (fileArray.length > 5){
        fileArray.length = 5;
    }
    setAdoptionData({ ...adoptionData, houseCondition: { ...adoptionData.houseCondition, housePhotos: fileArray }});
  }

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
          {loadingUpdate && <LinearProgress />}
          {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>} 
          <Paper className={classes.paper} elevation={3}>
          {loadingDetail? (
            <div className={classes.loading}><CircularProgress /></div>
          ) : errorDetail ? (
            <Alert variant='danger'>{errorDetail}</Alert>
          ): adoptionData !== null? ( 
              <>      
              <Typography className={classes.title} align="center">
                Edit Pengajuan Adopsi
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
            ):(null)}
          </Paper>
        </Container>
  );
};

export default UpdateAdoption;
