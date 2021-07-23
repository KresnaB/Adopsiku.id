import express from 'express';
import { getFishes, getFishById, createFishOffer, updateFishOffer, deleteFishOffer } from '../../controller/pet/fishOfferController.js';

const router = express.Router();

router.get('/', getFishes);
router.get('/:id', getFishById);
router.post('/', createFishOffer);
router.put('/:id', updateFishOffer);
router.delete('/:id', deleteFishOffer);

export default router;