import Turtles from "../../../model/pet/turtleOfferModel.js";

// @route   GET /turtleOffer/
// @desc    Get all snake
// @access  Public
export const getTurtles = async (req, res) => {
  try {
    const turtles = await Turtles.find({});
    res.send({ turtles });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /turtleOffer/:id
// @desc    Get a specific snake offer
// @access  Public
export const getTurtleById = async (req, res) => {
  try {
    const turtle = await Turtles.findById(req.params.id);
    res.send({ turtle });
  } catch (err) {
    res.status(404).send({ message: "turtle not found!" });
  }
};

// @route   POST /turtleOffer/
// @desc    Create a snake offer
// @access  Public
export const createTurtleOffer = async (req, res) => {
  try {
    const newTurtleOffer = await Turtles.create({
      createdAt: new Date().toISOString(),
      name: req.body.name,
      breeds: req.body.breeds,
      colors: req.body.colors,
      age: req.body.age,
      gender: req.body.gender,
      specialNeeds: req.body.specialNeeds,
      description: req.body.description,
      media: req.body.media,
      adoptFee: req.body.adoptFee,
      status: "Dapat Diadopsi",
      size: req.body.size,
      provider: req.body.provider,
    });
    res.send({ newTurtleOffer });
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route   PUT /turtleOffer/:id
// @desc    Update a snake offer
// @access  Public
export const updateTurtleOffer = async (req, res) => {
  try {
    const updatedTurtleOffer = await Turtles.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ updatedTurtleOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   DELETE /turtleOffer/:id
// @desc    Delete a snake offer
// @access  Public
export const deleteTurtleOffer = async (req, res) => {
  try {
    const removedTurtle = await Turtles.findByIdAndRemove(req.params.id);
    res.send({ removedTurtle });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
