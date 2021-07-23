import Fishes from '../../model/pet/fishOfferModel.js';

// @route   GET /fishOffers/
// @desc    Get all fishes
// @access  Public
export const getFishes = async (req, res) => {
    try {
        const fishes = await Fishes.find({});
        res.send({ fishes })
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   GET /fishOffers/:id
// @desc    Get a specific fish offer
// @access  Public
export const getFishById = async (req, res) => {
    try {
        const fish = await Fishes.findById(req.params.id);
        res.send({ fish });
    } catch (err) {
        res.status(404).send({ message: 'Fish not found!' });
    }
};

// @route   POST /fishOffers/
// @desc    Create a fish offer
// @access  Public
export const createFishOffer = async (req, res) => {
    try {
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
            status: 'Dapat Diadopsi',
            size: req.body.size,
            provider: req.body.provider
        });
        res.send({ newFishOffer });
    } catch(error) {
        res.status(400).send( error );
    }
};
  
// @route   PUT /fishOffers/:id
// @desc    Update a fish offer
// @access  Public
export const updateFishOffer = async (req, res) => {
    try {
        const updatedFishOffer = await Fishes.findByIdAndUpdate(req.params.id, req.body);
        res.send( updatedFishOffer );
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   DELETE /fishOffers/:id
// @desc    Delete a fish offer
// @access  Public
export const deleteFishOffer = async (req, res) => {
    try {
      const removedFish = await Fishes.findByIdAndRemove(req.params.id);
       res.send({ message: 'The fish offer was removed' });
    } catch(err) {
      res.status(400).send({ error: err });
    }
};

