import express from 'express';
import { getChickenOffers, getChickenOfferById, createChickenOffer, updateChickenOffer, deleteChickenOffer } from '../../controller/pet/chickenOfferController.js';

const router = express.Router();

router.get('/', getChickenOffers);
router.get('/:id', getChickenOfferById);
router.post('/', createChickenOffer);
router.put('/:id', updateChickenOffer);
router.delete('/:id', deleteChickenOffer);

export default router;