const validationEdit = (values) => {
  const regexName = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
  const regexNumber = /^[0-9]*$/;
  let errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 2 && values.name.length > 50) {
    errors.name = "Name must be at least 2 and max 50 characters";
  }

  if (!values.personInCharge) {
    errors.personInCharge = "Name is required";
  } else if (!values.personInCharge.match(regexName)) {
    errors.personInCharge = "Only alphabetical allowed";
  } else if (
    values.personInCharge.length < 2 &&
    values.personInCharge.length > 50
  ) {
    errors.personInCharge = "Name must be at least 2 and max 50 characters";
  }

  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (!values.name.match(regexEmail)) {
  //     errors.email = "Format email is not valid";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 6) {
  //     errors.password = "Password must be at least 6";
  //   }

  if (!values.imageUrl) {
    errors.imageUrl = "Image is required";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else if (!values.phoneNumber.match(regexNumber)) {
    errors.phoneNumber = "Only number allowed";
  } else if (values.phoneNumber.length < 10 || values.phoneNumber.length > 13) {
    errors.phoneNumber = "Phone number must be at least 10 and max 13 number";
  }

  // const birthYear = moment(values.birthDate).format("YYYY");
  // const year = moment().format("YYYY");
  // const yearAge = year - birthYear;

  // if (!values.birthDate) {
  //   errors.birthDate = "Birthdate is required";
  // } else if (yearAge < 17) {
  //   errors.birthDate = "You must be at least 17 years old";
  // }

  if (
    !values.address.province ||
    !values.address.city ||
    !values.address.district ||
    !values.address.village
  ) {
    errors.addressData = "All address field is required";
  }

  if (!values.address.additional) {
    errors.additional = "Full address field is required";
  }

  if (!values.gender) {
    errors.gender = "Gender is required";
  }

  if (!values.identityNumber) {
    errors.identityNumber = "Identity number is required";
  } else if (!values.identityNumber.match(regexNumber)) {
    errors.identityNumber = "Only number allowed";
  } else if (values.identityNumber.length !== 16) {
    errors.identityNumber = "Identity number must be 16 number";
  }

  if (!values.veterinarian.name) {
    errors.vetName = "Name is required";
  } else if (
    values.veterinarian.name.length < 2 &&
    values.veterinarian.name.length > 50
  ) {
    errors.vetName = "Name must be at least 2 and max 50 characters";
  }

  if (!values.veterinarian.personInCharge) {
    errors.vetDocter = "Name is required";
  } else if (!values.veterinarian.personInCharge.match(regexName)) {
    errors.vetDocter = "Only alphabetical allowed";
  } else if (
    values.veterinarian.personInCharge.length < 2 &&
    values.veterinarian.personInCharge.length > 50
  ) {
    errors.vetDocter = "Name must be at least 2 and max 50 characters";
  }

  if (!values.veterinarian.address) {
    errors.vetAddress = "Full address field is required";
  }

  return errors;
};

export default validationEdit;
