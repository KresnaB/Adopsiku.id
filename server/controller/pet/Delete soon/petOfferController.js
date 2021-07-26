import PetOffers from "../../model/pet/petOfferModel.js";
import Birds from "../../../model/pet/birdOfferModel.js";
import Cats from "../../../model/pet/catOfferModel.js";
import chickenOfferModel from "../../../model/pet/chickenOfferModel.js";
import Dogs from "../../../model/pet/dogOfferModel.js";
import Fishes from "../../../model/pet/fishOfferModel.js";
import Furies from "../../../model/pet/furyOfferModel.js";
import Rabbits from "../../../model/pet/rabbitOfferModel.js";
import Turtles from "../../../model/pet/turtleOfferModel.js";

import Pet from "../../model/petModel.js";
import Offer from "../../model/offerModel.js";

// @route   GET /petoffers/
// @desc    Get all pet offers
// @access  Public
export const getPetOffers = async (req, res) => {
  try {
    const sortBy = {};
    const filterBy = {};

    if (req.query) {
      filterAndSort(filterBy, sortBy, req.query);
    }

    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page || "0");
    const totalOffer = await PetOffers.countDocuments(filterBy);
    const totalPage = Math.ceil(totalOffer / PAGE_SIZE);

    const petOffers = await PetOffers.find(filterBy)
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)
      .sort(sortBy);
    res.send({ petOffers, totalPage, totalOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export default function filterAndSort(filterBy, sortBy, input) {
  if (input) {
    const {
      time,
      price,
      category,
      gender,
      breeds,
      colors,
      age,
      source,
      adoptFee,
      size,
      furLength,
      spayedNeutered,
      vaccinated,
      trained,
      chirping,
    } = input;
    if (time) {
      const sortTime = time.split(":");
      sortBy["createdAt"] = sortTime[0] === "oldest" ? -1 : 1;
    }
    if (price) {
      const sortPrice = price.split(":");
      sortBy["adoptFee"] = sortPrice[0] === "highest" ? -1 : 1;
    }
    if (category) filterBy["category"] = category;
    if (gender) filterBy["gender"] = gender;
    if (breeds) {
      let arr = [];
      breeds.map((breed) => {
        const test = { breeds: breed };
        arr.push(test);
      });
      filterBy["$or"] = arr;
    }
    if (colors) {
      let arr = [];
      colors.map((color) => {
        const test = { colors: color };
        arr.push(test);
      });
      filterBy["$or"] = arr;
    }
    if (furLength) {
      let arr = [];
      furLength.map((fur) => {
        const test = { furLength: fur };
        arr.push(test);
      });
      filterBy["$or"] = arr;
    }
    if (gender) {
      let arr = [];
      gender.map((checked) => {
        const test = { gender: checked };
        arr.push(test);
      });
      filterBy["$or"] = arr;
    }
    if (trained) filterBy["trained"] = trained;
    if (spayedNeutered) filterBy["spayedNeutered"] = spayedNeutered;
    if (vaccinated) filterBy["vaccinated"] = vaccinated;
    console.log(filterBy);
  }
}

// @route   GET /petoffers/:id
// @desc    Get a specific pet offer
// @access  Public
export const getPetOfferById = async (req, res) => {
  try {
    const petOffer = await PetOffers.findById(req.params.id).populate(
      "provider",
      "name address imageUrl"
    );
    res.send({ petOffer });
  } catch (err) {
    res.status(404).send({ message: "Pet not found!" });
  }
};

// @route   POST /petOffers/:type
// @desc    Create a pet offer
// @access  Public
export const createPetOffer = async (req, res) => {
  try {
    console.log(req.params.type);
    switch (req.params.type) {
      case "catOffers":
        const newCatOffer = await Cats.create({
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          description: req.body.description,
          media: req.body.media,
          source: req.body.source,
          adoptFee: req.body.adoptFee,
          status: "Dapat Diadopsi",
          size: req.body.size,
          furLength: req.body.furLength,
          spayedNeutered: req.body.spayedNeutered,
          vaccinated: req.body.vaccinated,
          trained: req.body.trained,
          provider: req.body.provider,
        });
        res.send({ newCatOffer });
        break;
      case "dogOffers":
        const newDogOffer = await Dogs.create({
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          description: req.body.description,
          media: req.body.media,
          source: req.body.source,
          adoptFee: req.body.adoptFee,
          status: "Dapat Diadopsi",
          size: req.body.size,
          furLength: req.body.furLength,
          spayedNeutered: req.body.spayedNeutered,
          vaccinated: req.body.vaccinated,
          trained: req.body.trained,
          provider: req.body.provider,
        });
        res.send({ newDogOffer });
        break;
      case "fishOffers":
        const newFishOffer = await Fishes.create({
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
        res.send({ newFishOffer });
        break;
      case "rabbitOffers":
        const newRabbitOffer = await Rabbits.create({
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          description: req.body.description,
          media: req.body.media,
          source: req.body.source,
          adoptFee: req.body.adoptFee,
          status: "Dapat Diadopsi",
          size: req.body.size,
          spayedNeutered: req.body.spayedNeutered,
          vaccinated: req.body.vaccinated,
          provider: req.body.provider,
        });
        res.send({ newRabbitOffer });
        break;
      case "birdOffers":
        const newBirdOffer = await Birds.create({
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          description: req.body.description,
          media: req.body.media,
          source: req.body.source,
          adoptFee: req.body.adoptFee,
          status: "Dapat Diadopsi",
          size: req.body.size,
          chirping: req.body.chirping,
          trained: req.body.trained,
          provider: req.body.provider,
        });
        res.send({ newBirdOffer });
        break;
      case "furyOffers":
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
        break;
      case "chickenOffers":
        const newChickens = await chickenOfferModel.create({
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
          source: req.body.source,
          crow: req.body.crow,
          size: req.body.size,
        });
        res.send({ newChickens });
        break;
      case "turtleOffers":
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
        break;
      default:
        console.log(`No pet with ${req.params.type} type!`);
        res.send(`No pet with ${req.params.type} type!`);
        break;
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   PUT /petOffers/:id
// @desc    Update a pet offer
// @access  Public
export const updatePetOffer = async (req, res) => {
  try {
    const updatedPetOffers = await PetOffers.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ updatedPetOffers });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /petoffers/:providerID
// @desc    Get all pet offers
// @access  Public
export const getPetOffersByProviderID = async (req, res) => {
  try {
    const petOffers = await PetOffers.find({ provider: req.params.id });
    res.send({ petOffers });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   DELETE /petoffers/:id
// @desc    Delete a pet offer
// @access  Public
export const deletePetOffer = async (req, res) => {
  try {
    await PetOffers.findOneAndRemove({
      _id: req.params.id,
      provider: req.params.provid,
    });
    res.send("update success");
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const updateStatusPetOffer = async (req, res) => {
  try {
    await PetOffers.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.body.status }
    );
    res.send("update success");
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
