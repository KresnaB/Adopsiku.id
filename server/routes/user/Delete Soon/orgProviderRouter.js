import express from 'express';
import { register, getOrgProviders, getOrgProviderById, createOrgProvider, updateOrgProvider } from '../../controller/user/orgProviderController.js';

const router = express.Router();

router.get('/', getOrgProviders);
router.get('/:id', getOrgProviderById);
router.post('/', createOrgProvider);
router.put('/:id', updateOrgProvider);
router.post('/register', register);

export default router;