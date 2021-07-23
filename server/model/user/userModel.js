import mongoose from 'mongoose';

  const userOptions = {
    discriminatorKey: 'role', // our discriminator key, could be anything
    collection: 'users', // the name of our collection
  };
  
  // User schema: these properties will be shared with our "real" schemas
  const User = mongoose.model('User', new mongoose.Schema({
        createdAt: { type: Date },
        name: { type: String, required: true },
        email: { type: String, required: true, unique : true },
        password: { type: String, required: true },
        status: { type: String, required: true },
        imageUrl: { type: String },
        isVerified: { type: Boolean, default: false}
      }, userOptions
    ),
  );

  export default User;