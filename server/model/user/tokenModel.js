import mongoose from 'mongoose';

const token = mongoose.model('token', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true},
    createdAt: { type: Date, required: true, default: Date.now, expires: 3600 }    
    }),
);

export default token;
