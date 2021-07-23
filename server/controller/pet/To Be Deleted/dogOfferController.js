import Dogs from '../../model/pet/dogOfferModel.js';

// @route   GET /dogOffers/
// @desc    Get all dogs
// @access  Public
export const getDogs = async (req, res) => {
    try {
        const dogs = await Dogs.find({});
        res.send({ dogs })
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   GET /dogOffers/:id
// @desc    Get a specific dog offer
// @access  Public
export const getDogById = async (req, res) => {
    try {
        const dog = await Dogs.findById(req.params.id);
        res.send({ dog });
    } catch (err) {
        res.status(404).send({ message: 'Dog offer not found!' });
    }
};

// @route   POST /dogOffers/
// @desc    Create a dog
// @access  Public
export const createDogOffer = async (req, res) => {
    try {
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
            status: 'Dapat Diadopsi',
            size: req.body.size,
            furLength: req.body.furLength,
            spayedNeutered: req.body.spayedNeutered,
            vaccinated: req.body.vaccinated,
            trained: req.body.trained,
            provider: req.body.provider
        });
        res.send({ newDogOffer });
    } catch(error) {
        res.status(400).send( error );
    }
};


// @route   PUT /dogOffers/:id
// @desc    Update a dog offer
// @access  Public
export const updateDogOffer = async (req, res) => {
    try {
        const updatedDogOffer = await Dogs.findByIdAndUpdate(req.params.id, req.body);
        res.send( updatedDogOffer );
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   DELETE /dogOffers/:id
// @desc    Delete a dog offer
// @access  Public
export const deleteDogOffer = async (req, res) => {
    try {
      const removedDog = await Dogs.findByIdAndRemove(req.params.id);
       res.send({ message: 'The dog offer was removed' });
    } catch(err) {
      res.status(400).send({ error: err });
    }
};