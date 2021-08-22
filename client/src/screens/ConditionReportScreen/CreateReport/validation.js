const validation = (values) => {
  let errors = {};

  console.log(values.photos);
  if (!values.photos[0]) {
    console.log("in");
    errors.photos = "Image is required";
  } else if (values.photos.length > 3) {
    errors.photos = "Max three photos";
  }
  if (values.type === null) {
    errors.type = "Type is required";
  }
  if (!values.title) {
    errors.title = "Title is required";
  } else if (values.title.length < 2 && values.title.length > 50) {
    errors.title = "Title must be at least 2 and max 50 characters";
  }
  if (!values.description) {
    errors.description = "Description is required";
  } else if (values.description.length < 2 && values.description.length > 180) {
    errors.description =
      "Description must be at least 2 and max 180 characters";
  }

  return errors;
};

export default validation;
