import express from 'express';
import { getCats, getCatById, createCatOffer, updateCatOffer, deleteCatOffer } from '../../controller/pet/catOfferController.js';

const router = express.Router();

router.get('/', getCats);
router.get('/:id', getCatById);
router.post('/', createCatOffer);
router.put('/:id', updateCatOffer);
router.delete('/:id', deleteCatOffer);

export default router;