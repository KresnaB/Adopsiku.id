import express from 'express';
import { getBirds, getBirdById, createBirdOffer, updateBirdOffer, deleteBirdOffer } from '../../controller/pet/birdOfferController.js';

const router = express.Router();

router.get('/', getBirds);
router.get('/:id', getBirdById);
router.post('/', createBirdOffer);
router.put('/:id', updateBirdOffer);
router.delete('/:id', deleteBirdOffer);

export default router;