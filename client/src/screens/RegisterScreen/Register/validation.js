const validation = (values) => {
  const regexName = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
  const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  let errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (!values.name.match(regexName)) {
    errors.name = "Only alphabetical allowed";
  } else if (values.name.length < 2 && values.name.length > 50) {
    errors.name = "Name must be at least 2 and max 50 characters";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!regexPassword.test(values.password)) {
    errors.password =
      "Enter a combination of at least 8 letters (uppercase and lowercase), numbers, or punctuation marks (for example ! and &)";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords are not the same";
  }

  return errors;
};

export default validation;
