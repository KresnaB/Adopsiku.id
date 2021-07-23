import Birds from '../../model/pet/birdOfferModel.js';

// @route   GET /birdOffers/
// @desc    Get all birds
// @access  Public
export const getBirds = async (req, res) => {
    try {
        const birds = await Birds.find({});
        res.send({ birds })
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   GET /birdOffers/:id
// @desc    Get a specific bird offer
// @access  Public
export const getBirdById = async (req, res) => {
    try {
        const bird = await Birds.findById(req.params.id);
        res.send({ bird });
    } catch (err) {
        res.status(404).send({ message: 'Bird offer not found!' });
    }
};

// @route   POST /birdOffers/
// @desc    Create a bird offer
// @access  Public
export const createBirdOffer = async (req, res) => {
    try {
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
            status: 'Dapat Diadopsi',
            size: req.body.size,
            chirping: req.body.chirping,
            trained: req.body.trained,
            provider: req.body.provider
        });
        res.send({ newBirdOffer });
    } catch(error) {
        res.status(400).send( error );
    }
};
  
// @route   PUT /birdOffers/:id
// @desc    Update a bird offer
// @access  Public
export const updateBirdOffer = async (req, res) => {
    try {
        const updatedBirdOffer = await Birds.findByIdAndUpdate(req.params.id, req.body);
        res.send( updatedBirdOffer );
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   DELETE /birdOffers/:id
// @desc    Delete a bird offer
// @access  Public
export const deleteBirdOffer = async (req, res) => {
    try {
      const removedBird = await Birds.findByIdAndRemove(req.params.id);
       res.send({ message: 'The bird offer was removed' });
    } catch(err) {
      res.status(400).send({ error: err });
    }
};

