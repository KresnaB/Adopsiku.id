import mongoose from 'mongoose';
import Address from './addressModel.js'

const Vet = { 
    name: { type: String },
    personInCharge: { type: String },
    address: { type: String },
};

export default Vet;