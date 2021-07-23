import mongoose from 'mongoose';

const Address = { 
    province: { type: String },
    city: { type: String },
    district: { type: String },
    village: { type: String },
    additional: { type: String }
};


export default Address;