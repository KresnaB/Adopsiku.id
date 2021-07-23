import AdoptionRequest from "../../model/adoption/AdoptionRequestModel.js";

// @route   POST /adoptions/applyadoption/:adopter/:offer
// @desc    Create an adoption request
// @access  Adopter
export const applyAdoption = async (req, res) => {
  try {
    // const offerCheck = await AdoptionRequest.find({
    //   offer: req.params.offer,
    //   adopter: req.params.adopter,
    // });

    // if (offerCheck)
    //   return res
    //     .status(400)
    //     .send({
    //       message: "Anda sudah pernah mengajukan adopsi pada hewan ini",
    //     });
    // console.log(req.body)
    const newAdoptionRequest = await AdoptionRequest.create({
      pet: req.body.pet,
      adopter: req.body.adopter,
      houseCondition: req.body.houseCondition,
      commitment: req.body.commitment,
      experience: req.body.experience,
      createdAt: new Date().toISOString(),
    });

    res.status(200).send({ newAdoptionRequest });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/offer/:id
// @desc    get adoption requests by offer
// @access  Provider
export const getAdoptionsByAdopter = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.find({
      adopter: req.params.id,
    })
      .populate({
        path: "pet",
        populate: {
          path: "provider",
        },
      }).populate("adopter");

    res.status(200).send({ adoptionRequests });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/offer/:id
// @desc    get adoption requests by offer
// @access  Provider
export const getAdoptionsByProvider = async (req, res) => {
  try {
    const adoptionReq = await AdoptionRequest.find()
      .populate({
        path: "pet",
        populate: {
          path: "provider",
          match: { _id: req.params.id },
        }
      })
      .populate("adopter");
    const adoptionRequests = adoptionReq.filter((adoption) => adoption.pet.provider !== null);

    res.status(200).send({ adoptionRequests });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   PUT /adoptions/update/:id
// @desc    Update an adoption request
// @access  Adopter and provider
export const updateAdoption = async (req, res) => {
  try {
    const updatedAdoptionRequest = await AdoptionRequest.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send({ updatedAdoptionRequest });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   DELETE /adoptions/canceladoption/:id
// @desc    Delete an adoption request
// @access  Adopter
export const cancelAdoption = async (req, res) => {
  try {
    console.log(req.params.id);
    await AdoptionRequest.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/offer/:id
// @desc    get adoption requests by offer
// @access  Provider
export const getAdoptionByOffer = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.find({
      pet: req.params.id,
    });
    res.status(200).send({ adoptionRequests });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/detail/:id
// @desc    get an adoption request detail
// @access  Adopter and provider
export const getAdoptionDetail = async (req, res) => {
  try {
    const adoptionRequest = await AdoptionRequest.findById(req.params.id);
    res.status(200).send({ adoptionRequest });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   PUT /adoptions/updatestatus
// @desc    update an adoption request status
// @access  provider
export const updateAdoptionStatus = async (req, res) => {
  try {
    await AdoptionRequest.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.status(200).send({ message: "Update status adopsi sukses dilakuakan" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
