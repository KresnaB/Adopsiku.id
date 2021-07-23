import mongoose from 'mongoose';
import User from './userModel.js'
import Vet from './vetModel.js';
import Address from './addressModel.js';
  
  // Our Base schema: these properties will be shared with our "real" schemas
  const OrganizationalProvider = User.discriminator('OrganizationalProvider', new mongoose.Schema({
        phoneNumber: { type: String },
        identityNumber: { type: String },
        personInCharge: { type: String },
        address: { type: Address },
        veterinarian: Vet 
      },
    ),
  );
 
export default OrganizationalProvider;