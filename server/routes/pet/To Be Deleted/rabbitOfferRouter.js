import express from 'express';
import { getRabbits, getRabbitById, createRabbitOffer, updateRabbitOffer, deleteRabbitOffer } from '../../controller/pet/rabbitOfferController.js';

const router = express.Router();

router.get('/', getRabbits);
router.get('/:id', getRabbitById);
router.post('/', createRabbitOffer);
router.put('/:id', updateRabbitOffer);
router.delete('/:id', deleteRabbitOffer);

export default router;