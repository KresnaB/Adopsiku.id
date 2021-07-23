import Rabbits from '../../model/pet/rabbitOfferModel.js';

// @route   GET /rabbitOffers/
// @desc    Get all rabbits
// @access  Public
export const getRabbits = async (req, res) => {
    try {
        const rabbits = await Rabbits.find({});
        res.send({ rabbits })
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   GET /rabbitOffers/:id
// @desc    Get a specific rabbit offer
// @access  Public
export const getRabbitById = async (req, res) => {
    try {
        const rabbit = await Rabbits.findById(req.params.id);
        res.send({ rabbit });
    } catch (err) {
        res.status(404).send({ message: 'Rabbit offer not found!' });
    }
};

// @route   POST /rabbitOffers/
// @desc    Create a rabbit offer
// @access  Public
export const createRabbitOffer = async (req, res) => {
    try {
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
            status: 'Dapat Diadopsi',
            size: req.body.size,
            spayedNeutered: req.body.spayedNeutered,
            vaccinated: req.body.vaccinated,
            provider: req.body.provider
        });
        res.send({ newRabbitOffer });
    } catch(error) {
        res.status(400).send( error );
    }
};
  
// @route   PUT /rabbitOffers/:id
// @desc    Update a rabbit offer
// @access  Public
export const updateRabbitOffer = async (req, res) => {
    try {
        const updatedRabbitOffer = await Rabbits.findByIdAndUpdate(req.params.id, req.body);
        res.send( updatedRabbitOffer );
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   DELETE /rabbitOffers/:id
// @desc    Delete a rabbit offer
// @access  Public
export const deleteRabbitOffer = async (req, res) => {
    try {
      const removedRabbit = await Rabbits.findByIdAndRemove(req.params.id);
       res.send({ message: 'The rabbit offer was removed' });
    } catch(err) {
      res.status(400).send({ error: err });
    }
};

