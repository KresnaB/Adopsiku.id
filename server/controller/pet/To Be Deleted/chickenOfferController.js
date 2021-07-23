import chickenOfferModel from '../../model/pet/chickenOfferModel.js';

// @route   GET /chickenOffer/
// @desc    Get all other cats
// @access  Public
export const getChickenOffers = async (req, res) => {
    try {
        const chickens = await chickenOfferModel.find({});
        res.send({ chickens })
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   GET /chickenOffer/:id
// @desc    Get a specific other pet offer
// @access  Public
export const getChickenOfferById = async (req, res) => {
    try {
        const chickens = await chickenOfferModel.findById(req.params.id);
        res.send({ chickens });
    } catch (err) {
        res.status(404).send({ message: 'Other pets not found!' });
    }
};

// @route   POST /chickenOffer/
// @desc    Create a other pet offer
// @access  Public
export const createChickenOffer = async (req, res) => {
    try {
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
            status: 'Dapat Diadopsi',
            size: req.body.size,
            provider: req.body.provider,
            source: req.body.source,
            crow: req.body.crow,
            size: req.body.size,
        });
        res.send({ newChickens });
    } catch(error) {
        res.status(400).send( error );
    }
};
  
// @route   PUT /chickenOffer/:id
// @desc    Update an other pet offer
// @access  Public
export const updateChickenOffer = async (req, res) => {
    try {
        const updatedChickenOffer = await chickenOfferModel.findByIdAndUpdate(req.params.id, req.body);
        res.send( updatedChickenOffer );
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   DELETE /chickenOffer/:id
// @desc    Delete an other pet offer
// @access  Public
export const deleteChickenOffer = async (req, res) => {
    try {
        const removedChickenOffer = await chickenOfferModel.findByIdAndRemove(req.params.id);
        res.send({ message: 'The other pet offer was removed' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

