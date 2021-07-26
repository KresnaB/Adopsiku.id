import Birds from "../../../model/pet/birdOfferModel.js";
import Cats from "../../../model/pet/catOfferModel.js";
import chickenOfferModel from "../../../model/pet/chickenOfferModel.js";
import Dogs from "../../../model/pet/dogOfferModel.js";
import Fishes from "../../../model/pet/fishOfferModel.js";
import Furies from "../../../model/pet/furyOfferModel.js";
import Rabbits from "../../../model/pet/rabbitOfferModel.js";
import Turtles from "../../../model/pet/turtleOfferModel.js";
import Pet from "../../../model/pet/petModel.js";
import Offer from "../../../model/pet/offerModel.js";

// @route   POST /petOffers/:type
// @desc    Create a pet offer
// @access  Public
export const createOffer = async (req, res) => {
  try {
    console.log("in");
    let newPet;
    switch (req.params.type) {
      case "catOffers":
        newPet = await Cats.create({
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
        console.log("in2");
        break;
      case "dogOffers":
        newPet = await Dogs.create({
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
        newPet = await Fishes.create({
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
        newPet = await Rabbits.create({
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
        newPet = await Birds.create({
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
        newPet = await Furies.create({
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
        newPet = await chickenOfferModel.create({
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
        newPet = await Turtles.create({
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
    console.log(newPet);
    const newOffer = await Offer.create({
      provider: req.body.provider,
      pet: newPet._id,
      description: req.body.description,
      adoptFee: req.body.adoptFee,
      createdAt: new Date().toISOString(),
    });
    console.log(newOffer);
    const petOffer = {
      ...newPet,
      ...newOffer,
    };
    res.send({ petOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /petoffers/
// @desc    Get all pet offers
// @access  Public
export const getOffers = async (req, res) => {
  try {
    const sortBy = {};
    const match = {};
    const petMatch = {};
    const provMatch = {};

    if (req.query) {
      filterAndSort(match, petMatch, provMatch, sortBy, req.query);
    }

    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page || "0");
    const totalOffer = await Pet.countDocuments();
    const totalPage = Math.ceil(totalOffer / PAGE_SIZE);

    const petOffers = await Offer.find(match)
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)
      .sort(sortBy)
      .populate({
        path: "pet",
        match: petMatch,
      })
      .populate({
        path: "provider",
        match: provMatch,
      })
      .exec();

    res.send({ petOffers, totalPage, totalOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export default function filterAndSort(
  match,
  petMatch,
  provMatch,
  sortBy,
  input
) {
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
      sortBy["createdAt"] = sortTime[0] === "oldest" ? -1 : 1;
    }

    if (price) {
      const sortPrice = price.split(":");
      sortBy["adoptFee"] = sortPrice[0] === "highest" ? -1 : 1;
    }

    if (category) petMatch["category"] = category;
    if (source) {
      petMatch["source"] = { $in: source };
    }
    if (breeds) {
      petMatch["breed"] = { $in: breeds };
    }
    if (colors) {
      petMatch["color"] = { $in: colors };
    }
    if (furLength) {
      petMatch["furLength"] = { $in: furLength };
    }
    if (chirping) {
      petMatch["chirping"] = { $in: chirping };
    }
    if (cities) {
      provMatch["address.city"] = { $in: cities };
    }
    if (colors) {
      petMatch["color"] = { $in: colors };
    }
    if (trained) match["trained"] = trained;
    if (spayedNeutered) match["spayedNeutered"] = spayedNeutered;
    if (vaccinated) match["vaccinated"] = vaccinated;

    if (gender) {
      if (gender.length === 1) {
        if (gender[0] === "Jantan") {
          petMatch["gender"] = true;
        } else {
          petMatch["gender"] = false;
        }
      }
    }
  }
}

// @route   GET /petoffers/:id
// @desc    Get a specific pet offer
// @access  Public
export const getOfferById = async (req, res) => {
  try {
    const petOffer = await Offer.findById(req.params.id)
      .populate("provider", "name address imageUrl")
      .populate("pet");
    res.send({ petOffer });
  } catch (err) {
    res.status(404).send({ message: "Pet not found!" });
  }
};

// @route   PUT /petOffers/:id
// @desc    Update a pet offer
// @access  Public
export const updateOffer = async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body);
    const updatedPet = await Pet.findByIdAndUpdate(updatedOffer._id, req.body);

    const petOffer = {
      ...updatedPet,
      ...updatedOffer,
    };
    res.send({ petOffer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /petoffers/:providerID
// @desc    Get all pet offers
// @access  Public
export const getOffersByProviderID = async (req, res) => {
  try {
    const petOffers = await Offer.find({ provider: req.params.id }).populate(
      "pet"
    );
    res.send({ petOffers });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   DELETE /petoffers/:id
// @desc    Delete a pet offer
// @access  Public
export const deleteOffer = async (req, res) => {
  try {
    const deletedOffer = await Offer.findOneAndRemove({
      _id: req.params.id,
      provider: req.params.provid,
    });
    await Pet.findOneAndRemove({
      _id: deletedOffer.pet,
    });
    res.send("delete success");
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const updateStatusOffer = async (req, res) => {
  try {
    await Offer.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.body.status }
    );
    res.send("update success");
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
