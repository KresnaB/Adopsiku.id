import Cats from '../../model/pet/catOfferModel.js';

// @route   GET /catOffers/
// @desc    Get all cats
// @access  Public
export const getCats = async (req, res) => {
    try {
        const cats = await Cats.find({});
        res.send({ cats })
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   GET /catOffers/:id
// @desc    Get a specific cat offer
// @access  Public
export const getCatById = async (req, res) => {
    try {
        const cat = await Cats.findById(req.params.id);
        res.send({ cat });
    } catch (err) {
        res.status(404).send({ message: 'Cat offer not found!' });
    }
};

export const createCatOffer = async (req, res) => {
    try {
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
            status: 'Dapat Diadopsi',
            size: req.body.size,
            furLength: req.body.furLength,
            spayedNeutered: req.body.spayedNeutered,
            vaccinated: req.body.vaccinated,
            trained: req.body.trained,
            provider: req.body.provider
        });
        res.send({ newCatOffer });
    } catch(error) {
        res.status(400).send( error );
    }
};
  
// @route   PUT /catOffers/:id
// @desc    Update a cat offer
// @access  Public
export const updateCatOffer = async (req, res) => {
    try {
        const updatedCatOffer = await Cats.findByIdAndUpdate(req.params.id, req.body);
        res.send({ updatedCatOffer });
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   DELETE /catOffers/:id
// @desc    Delete a cat offer
// @access  Public
export const deleteCatOffer = async (req, res) => {
    try {
      const removedCat = await Cats.findByIdAndRemove(req.params.id);
       res.send({ removedCat });
    } catch(err) {
      res.status(400).send({ error: err });
    }
};

