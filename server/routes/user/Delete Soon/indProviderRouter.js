import express from 'express';
import { register, getIndProviders, getIndProviderById, createIndProvider, updateIndProvider } from '../../controller/user/indProviderController.js';

const router = express.Router();

router.get('/', getIndProviders);
router.get('/:id', getIndProviderById);
router.post('/', createIndProvider);
router.put('/:id', updateIndProvider);
router.post('/register', register);

export default router;