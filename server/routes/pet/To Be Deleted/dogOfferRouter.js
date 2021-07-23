import express from 'express';
import { getDogs, getDogById, createDogOffer, updateDogOffer, deleteDogOffer } from '../../controller/pet/dogOfferController.js';

const router = express.Router();

router.get('/', getDogs);
router.get('/:id', getDogById);
router.post('/', createDogOffer);
router.put('/:id', updateDogOffer);
router.delete('/:id', deleteDogOffer);

export default router;