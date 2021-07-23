import Admins from "../../../model/user/adminModel";

// @route   GET /adopters/:id
// @desc    Get a specific adopter
// @access  Public
export const getAdopterById = async (req, res) => {
  try {
    const adopter = await Adopters.findById(req.params.id);
    res.send({ adopter });
  } catch (err) {
    res.status(404).send({ message: "Adopter not found!" });
  }
};

// @route   POST /adopters/
// @desc    Create an adopter
// @access  Public
export const createAdopter = async (req, res) => {
  try {
    const newAdopter = await Adopters.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
      phoneNumber: req.body.phoneNumber,
      address: {
        province: req.body.address.province,
        city: req.body.address.city,
        postal_code: req.body.address.postal_code,
        street: req.body.address.street,
      },
      birthDate: new Date(),
      gender: req.body.gender,
      identityNumber: req.body.identityNumber,
    });
    res.send({ newAdopter });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   PUT /adopters/:id
// @desc    Update an adopter
// @access  Public
export const updateAdopter = async (req, res) => {
  try {
    const updatedAdopter = await Adopters.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ message: "The adopter was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
