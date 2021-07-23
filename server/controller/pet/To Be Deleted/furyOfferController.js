import Furies from "../../../model/pet/furyOfferModel.js";

// @route   GET /snakeOffers/
// @desc    Get all snake
// @access  Public
export const getFuries = async (req, res) => {
  try {
    const furies = await Furies.find({});
    res.send({ furies });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /furies/:id
// @desc    Get a specific snake offer
// @access  Public
export const getFuryById = async (req, res) => {
  try {
    const fury = await Furies.findById(req.params.id);
    res.send({ fury });
  } catch (err) {
    res.status(404).send({ message: "Fury not found!" });
  }
};

// @route   POST /furies/
// @desc    Create a snake offer
// @access  Public
export const createFuryOffer = async (req, res) => {
  try {
    const newFuryOffer = await Furies.create({
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
    res.send({ newFuryOffer });
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route   PUT /snakeOffer/:id
// @desc    Update a snake offer
// @access  Public
export const updateFuryOffer = async (req, res) => {
  try {
    const updatedFuryOffer = await Furies.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ updatedFuryOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   DELETE /snakeOffers/:id
// @desc    Delete a snake offer
// @access  Public
export const deleteFuryOffer = async (req, res) => {
  try {
    const removedFury = await Furies.findByIdAndRemove(req.params.id);
    res.send({ removedFury });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
