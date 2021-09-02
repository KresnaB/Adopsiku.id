import Birds from "../../model/pet/birdOfferModel.js";
import Cats from "../../model/pet/catOfferModel.js";
import chickenOfferModel from "../../model/pet/chickenOfferModel.js";
import Dogs from "../../model/pet/dogOfferModel.js";
import Fishes from "../../model/pet/fishOfferModel.js";
import Furies from "../../model/pet/furyOfferModel.js";
import Rabbits from "../../model/pet/rabbitOfferModel.js";
import Turtles from "../../model/pet/turtleOfferModel.js";
import Pet from "../../model/pet/petModel.js";
import AdoptionRequest from "../../model/adoption/AdoptionRequestModel.js";
import User from "../../model/user/userModel.js";
import moment from "moment";

// @route   POST /petOffers/:type
// @desc    Create a pet offer
// @access  Public
export const createPet = async (req, res) => {
  try {
    let petOffer;
    switch (req.params.type) {
      case "catOffers":
        petOffer = await Cats.create({
          provider: req.body.provider,
          description: req.body.description,
          adoptFee: req.body.adoptFee,
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          photos: req.body.media,
          source: req.body.source,
          size: req.body.size,
          furLength: req.body.furLength,
          spayedNeutered: req.body.spayedNeutered,
          vaccinated: req.body.vaccinated,
          trained: req.body.trained,
        });
        break;
      case "dogOffers":
        petOffer = await Dogs.create({
          provider: req.body.provider,
          description: req.body.description,
          adoptFee: req.body.adoptFee,
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          photos: req.body.media,
          source: req.body.source,
          size: req.body.size,
          furLength: req.body.furLength,
          spayedNeutered: req.body.spayedNeutered,
          vaccinated: req.body.vaccinated,
          trained: req.body.trained,
        });
        break;
      case "fishOffers":
        petOffer = await Fishes.create({
          provider: req.body.provider,
          description: req.body.description,
          adoptFee: req.body.adoptFee,
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          photos: req.body.media,
          size: req.body.size,
        });
        break;
      case "rabbitOffers":
        petOffer = await Rabbits.create({
          provider: req.body.provider,
          description: req.body.description,
          adoptFee: req.body.adoptFee,
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          photos: req.body.media,
          source: req.body.source,
          size: req.body.size,
          spayedNeutered: req.body.spayedNeutered,
          vaccinated: req.body.vaccinated,
        });
        break;
      case "birdOffers":
        petOffer = await Birds.create({
          provider: req.body.provider,
          description: req.body.description,
          adoptFee: req.body.adoptFee,
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          photos: req.body.media,
          source: req.body.source,
          size: req.body.size,
          chirping: req.body.chirping,
          trained: req.body.trained,
        });
        break;
      case "furyOffers":
        petOffer = await Furies.create({
          provider: req.body.provider,
          description: req.body.description,
          adoptFee: req.body.adoptFee,
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          photos: req.body.media,
          size: req.body.size,
        });
        break;
      case "chickenOffers":
        petOffer = await chickenOfferModel.create({
          provider: req.body.provider,
          description: req.body.description,
          adoptFee: req.body.adoptFee,
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          photos: req.body.media,
          size: req.body.size,
          provider: req.body.provider,
          source: req.body.source,
          crow: req.body.crow,
          size: req.body.size,
        });
        break;
      case "turtleOffers":
        petOffer = await Turtles.create({
          provider: req.body.provider,
          description: req.body.description,
          adoptFee: req.body.adoptFee,
          createdAt: new Date().toISOString(),
          name: req.body.name,
          breeds: req.body.breeds,
          colors: req.body.colors,
          age: req.body.age,
          gender: req.body.gender,
          specialNeeds: req.body.specialNeeds,
          photos: req.body.media,
          size: req.body.size,
        });
        break;
      default:
        console.log(`No pet with ${req.params.type} type!`);
        res.send(`No pet with ${req.params.type} type!`);
        break;
    }

    res.send({ petOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /petoffers/
// @desc    Get all pet offers
// @access  Public
export const getPets = async (req, res) => {
  try {
    const sortBy = {};
    const match = {};
    const provMatch = {};

    if (req.query) {
      filterAndSort(match, provMatch, sortBy, req.query);
    }

    console.log(req.query);

    match.status = 0;
    //Pagination
    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page || "0");
    console.log(match);
    const pets = await Pet.find(match)
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)
      .sort(sortBy)
      .populate({
        path: "provider",
        match: provMatch,
      })
      .exec();

    // const explain = await Pet.find(match)
    //   .explain()
    //   .then((res) => res[0]);
    // // Object describing how MongoDB planned to execute the query
    // console.log(explain.queryPlanner);
    // // Object containing stats about how MongoDB executed the query
    // console.log(explain.executionStats);

    const petOffers = pets.filter((pet) => pet.provider !== null);
    const totalOffer = await Pet.countDocuments(match);
    const totalPage = Math.ceil(totalOffer / PAGE_SIZE);

    res.send({ petOffers, totalPage, totalOffer });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

export default function filterAndSort(match, provMatch, sortBy, input) {
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
      cities,
    } = input;

    if (time) {
      const sortTime = time.split(":");
      sortBy["createdAt"] = sortTime[0] === "oldest" ? 1 : -1;
    }

    if (price) {
      const sortPrice = price.split(":");
      sortBy["adoptFee"] = sortPrice[0] === "highest" ? -1 : 1;
    }

    if (category) match["category"] = category;
    if (source) {
      match["source"] = { $in: source };
    }
    if (breeds) {
      match["breeds"] = { $in: breeds };
    }
    if (colors) {
      match["colors"] = { $in: colors };
    }
    if (furLength) {
      match["furLength"] = { $in: furLength };
    }
    if (chirping) {
      match["chirping"] = { $in: chirping };
    }
    if (cities) {
      provMatch["address.city"] = { $in: cities };
    }
    if (trained) match["trained"] = trained;
    if (spayedNeutered) match["spayedNeutered"] = spayedNeutered;
    if (vaccinated) match["vaccinated"] = vaccinated;

    if (gender) {
      if (gender.length === 1) {
        if (gender[0] === "Jantan") {
          match["gender"] = true;
        } else {
          match["gender"] = false;
        }
      }
    }
  }
}

// @route   GET /petoffers/:id
// @desc    Get a specific pet offer
// @access  Public
export const getPetById = async (req, res) => {
  try {
    const petOffer = await Pet.findById(req.params.id).populate(
      "provider",
      "name address imageUrl"
    );
    const adopter = await AdoptionRequest.find(
      { pet: req.params.id },
      "adopter status"
    ).populate("adopter", "_id name");
    res.send({ petOffer, adopter });
  } catch (err) {
    res.status(404).send({ message: "Pet not found!" });
  }
};

// @route   PUT /petOffers/:id
// @desc    Update a pet offer
// @access  Public
export const updatePet = async (req, res) => {
  try {
    let petOffer;
    switch (req.body.category) {
      case "Bird":
        petOffer = await Birds.findByIdAndUpdate(req.params.id, req.body);
        break;
      case "Cat":
        petOffer = await Cats.findByIdAndUpdate(req.params.id, req.body);
        break;
      case "Chicken":
        petOffer = await chickenOfferModel.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        break;
      case "Dog":
        petOffer = await Dogs.findByIdAndUpdate(req.params.id, req.body);
        break;
      case "Fish":
        petOffer = await Fishes.findByIdAndUpdate(req.params.id, req.body);
        break;
      case "Fury":
        petOffer = await Furies.findByIdAndUpdate(req.params.id, req.body);
        break;
      case "Rabbit":
        petOffer = await Rabbits.findByIdAndUpdate(req.params.id, req.body);
        break;
      case "Turtle":
        petOffer = await Turtles.findByIdAndUpdate(req.params.id, req.body);
        break;
      default:
        petOffer = await Pet.findByIdAndUpdate(req.params.id, req.body);
        break;
    }

    res.send({ petOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const setReportDuration = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      { _id: req.params.id },
      { reportDuration: req.body.duration },
      { satuan: req.body.satuan },
    );
    const petOffer = await Pet.findByIdAndUpdate(
      { _id: req.params.id },
      { nextNotif: moment(pet.adoptedAt).add(req.body.duration, req.body.satuan)}
    );
    
    res.send({ petOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /petoffers/:providerID
// @desc    Get all pet offers
// @access  Public
export const getPetsByProviderID = async (req, res) => {
  try {
    const petOffers = await Pet.find({ provider: req.params.id });
    res.send({ petOffers });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   DELETE /petoffers/:id
// @desc    Delete a pet offer
// @access  Public
export const deletePet = async (req, res) => {
  try {
    await Pet.findOneAndRemove({
      _id: req.params.id,
      provider: req.params.provid,
    });
    await AdoptionRequest.deleteMany({ pet: req.params.id });
    res.send("delete success");
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

export const updatePetStatus = async (req, res) => {
  try {
    await Pet.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.body.status }
    );
    if (req.body.status === 2) {
      await AdoptionRequest.updateMany({ pet: req.params.id }, { status: 3 });
      await Pet.updateOne(
        { _id: req.params.id },
        { adoptedAt: new Date().toISOString() }
      );
      await AdoptionRequest.findByIdAndUpdate(req.body.offer, { status: 2 });
    }
    res.send("update success");
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const getProviderPets = async (req, res) => {
  try {
    const provider = await User.findById({ _id: req.params.id });
    const petOffers = await Pet.find({ provider: req.params.id });
    res.send({ provider, petOffers });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
