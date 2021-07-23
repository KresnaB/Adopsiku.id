const validation = (values) => {

    let errors={};

    const regex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
    if (!values.name){
        errors.name = "Nama harus diisi";
    } else if(!values.name.match(regex)){
        errors.name = "Hanya boleh berisi karakter alpabet"
    }
    if (!values.gender){
        errors.gender =  "Opsi harus dipilih"
    }
    if (values.breeds.length === 0){
        errors.breeds =  "Opsi harus dipilih";
    }
    if (values.colors.length === 0){
        errors.colors =  "Opsi harus dipilih";
    }
    if (values.age <= 0){
        errors.age =  "Umur harus diisi";
    }
    if (!values.specialNeeds){
        errors.specialNeeds =  "Kebutuhan khusus harus diisi"
    }
    if (!values.description){
        errors.description =  "Deskripsi harus diisi"
    }
    if (values.colors.media === 0){
        errors.media =  "Harus mengungah foto hewan peliharaan"
    }
    if (!values.source){
        errors.source =  "Opsi harus dipilih"
    }
    if (values.adoptFee < 0){
        errors.adoptFee =  "Nilai tidak boleh kurang dari nol";
    }
    if (values.size <= 0){
        errors.size =  "Nilai tidak boleh nol";
    }
    if (!values.furLength){
        errors.furLength =  "Opsi harus dipilih"
    }
    return errors;
}

export default validation;



const isText = RegExp(/^[A-Z ]+$/i);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/); // us
const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/); // us
const isNumber = RegExp(/^\d+$/);

export default function formValidation(name, value, schema) {
  const { validate, minLength, maxLength } = schema[name];
  let error = "";

  if (minLength && value.length < minLength)
    error = `Minimum ${minLength} characters is required.`;
  else if (maxLength && value.length > maxLength)
    error = `Maximum length of ${maxLength} exceeded!`;
  if (!validate) return;

  switch (validate) {
    case "text":
      if (!isText.test(value)) error = "This field accept text only.";
      break;

    case "number":
      if (!isNumber.test(value)) error = "This field accept numbers only.";
      break;

    case "email":
      if (!isEmail.test(value)) error = "Please enter a valid email";
      break;

    case "phone":
      if (!isPhone.test(value))
        error = "Please enter a valid phone number. i.e: xxx-xxx-xxxx";
      break;

    case "zip":
      if (!isZip.test(value)) error = "Please enter a valid zip code";
      break;

    case "checkbox":
      if (!value) error = "Please select a value";
      break;

    default:
      break;
  }

  return error;
}
