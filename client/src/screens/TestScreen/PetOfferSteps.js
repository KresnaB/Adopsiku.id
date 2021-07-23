// import React, { useState, useEffect } from "react";
// import Typography from "@material-ui/core/Typography";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import PetOfferType from "../../component/PetOfferType/PetOfferType";
// import CatForm from "../../component/PetOfferForm/Cat/CatForm";
// import formValidation from '../Helper/formValidation'
// import { useDispatch, useSelector } from 'react-redux'
// import { createCatOffer } from '../../store/actions/petOfferActions'
// import { PET_OFFER_CREATE_RESET } from '../../constants/petOfferConstants'
// import { Alert } from '@material-ui/lab';
// import { useHistory } from 'react-router-dom'
// import useStyles from './styles'
// import LinearProgress from '@material-ui/core/LinearProgress';
// import { Paper } from "@material-ui/core";

// // Step titles
// const labels = ["Pilih Jenis Hewan", "Isi Data Hewan"];
// const fieldsValidation = {
//   name: {
//     error: "",
//     validate: "text",
//     minLength: 2,
//     maxLength: 20
//   },
//   gender: {},
//   breeds: {
//     error: "",
//     validate: "array"
//   },
//   colors: {
//     error: "",
//     validate: "array"
//   },
//   age: {},
//   special_needs: {
//     error: "",
//     validate: "text",
//     minLength: 2,
//     maxLength: 20
//   },
//   description: {
//     error: "",
//     validate: "text",
//     minLength: 2,
//     maxLength: 20
//   },
//   media: {
//     error: "",
//     validate: "array"
//   },
//   source: {
//     error: "",
//     validate: "text",
//     minLength: 2,
//     maxLength: 20
//   },
//   adopt_fee: {},
//   size: {},
//   fur_length: {},
//   spayed_neutered: {},
//   vaccinated: {},
//   trained: {},
// };

// const PetOfferSteps = () => {
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin
//   const history = useHistory();
//   const [activeStep, setActiveStep] = useState(0);
//   const [petType, setType] = useState();
//   const [error, setError] = useState({});
//   const [petData, setPetData] = useState({ 
//     name: '',
//     gender: '',
//     breeds: [],
//     colors: [],
//     age: 0,
//     special_needs: '',
//     description: '',
//     media: [],
//     source: '',
//     adopt_fee: 0,
//     size: 0,
//     fur_length: '',
//     spayed_neutered: false,
//     vaccinated: false,
//     trained: false,
//     provider: userInfo.id
//   });

//   const petOfferCreate = useSelector((state) => state.petOfferCreate)
//   const {
//     loading: loadingCreate,
//     error: errorCreate,
//     success: successCreate,
//   } = petOfferCreate

//   useEffect(() => {
//     console.log(successCreate)
//       if (successCreate) {
//         dispatch({ type: PET_OFFER_CREATE_RESET })
//         history.push('/dashboard/pet')
//       }
//   }, [dispatch, history, successCreate])

//   // Proceed to next step
//   const handleNext = () => setActiveStep((prev) => prev + 1);
//   // Go back to prev step
//   const handleBack = () => setActiveStep((prev) => prev - 1);

//   const handleType = (event, newType) => {
//     setType(newType);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log(error)
//     // if (!error){
//         dispatch(createCatOffer(petData));
//     // }
//   };

//   const breedChange = (value) => {
//     if (value.length > 1){
//         const temp = value.length-1;
//         for (let i = 1; i < temp; i++){
//             value.pop();
//         }
//         setPetData({ ...petData, breeds: value});
//     } else {
//         setPetData({ ...petData, breeds: value});
//     }
//   }

//   const colorChange = (value) => {
//     if (value.length > 2){
//         const temp = value.length-2;
//         for (let i = 1; i < temp; i++){
//             value.pop();
//         }
//         setPetData({ ...petData, colors: value})
//     } else {
//         setPetData({ ...petData, colors: value})
//     }
//   }

  
//   const handleChange = (e) => {
//     let { name, value, checked, type } = e.target;
//     if (type === "number"){
//         let min, max;
//         if (name === "size"){
//             min = 1;
//             max = 20;
//         }else if(name === "age"){
//             min = 1;
//             max = 240;
//         }else if(name === "adopt_fee"){
//             min = 0;
//             max = 100000;
//         }
//         if(value < min){
//             value = min;
//         }
//         if(value > max){
//             value = max;
//         }
//         setPetData({ ...petData, [name]: value });
//     }else{
//         name === "spayed_neutered" || name === "vaccinated" || name === "trained" ? setPetData({ ...petData, [name]: checked }) : setPetData({ ...petData, [name]: value });
//     }

//     const error = formValidation(name, value, fieldsValidation) || "";

//     setError({
//       [name]: error
//     });
//   };

//   const handleFileUpload = (fileArray) => {
//     if (fileArray.length > 3){
//         fileArray.length = 3;
//     }
//     setPetData({ ...petData, media: fileArray });
//   }

//   const handleSteps = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <PetOfferType
//             handleNext={handleNext}
//             handleType={handleType}
//             value={petType}
//           />
//         );
//       case 1:
//         switch(petType) {
//           case 'kucing':
//               return (
//                 <CatForm 
//                   handleNext={handleNext}
//                   handleChange={handleChange}
//                   petData={petData}
//                   error={error}
//                   colorChange={colorChange}
//                   handleBack={handleBack}
//                   breedChange={breedChange}
//                   handleFileUpload={handleFileUpload}
//                   handleSubmit={handleSubmit}
//                 />
//               )
//           default:
//               return <PetOfferType />;
//         }
//       default:
//         break;
//     }
//   };

//   return (
//         <>
//           <Paper className={classes.container}>
//           {loadingCreate && <LinearProgress />}
//           {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>}  
//               <Typography className={classes.title} variant="h5" align="center">
//                 Buat Penawaran Hewan
//               </Typography>
//             <Stepper
//               activeStep={activeStep}
//               alternativeLabel
//             >
//               {labels.map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             {handleSteps(activeStep)}
//           </Paper>
//         </>
//   );
// };

// export default PetOfferSteps;
