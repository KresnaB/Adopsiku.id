import mongoose from 'mongoose';
import User from './userModel.js'
import Address from './addressModel.js'
  
  // Our Base schema: these properties will be shared with our "real" schemas
  const IndividualProvider = User.discriminator('IndividualProvider', new mongoose.Schema({
        phoneNumber: { type: String },
        address: { type: Address },
        birthDate: { type: Date },
        gender: { type: String },
        identityNumber: { type: String },
      },
    ),
  );
 
export default IndividualProvider;