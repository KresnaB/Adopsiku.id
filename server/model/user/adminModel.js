import mongoose from 'mongoose';
import User from './userModel.js'
  
  // Our Base schema: these properties will be shared with our "real" schemas
  const Admin = User.discriminator('Admin', new mongoose.Schema({
      },
    ),
  );
 
export default Admin;