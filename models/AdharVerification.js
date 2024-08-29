const mongoose = require('mongoose');
const { Schema } = mongoose;

// Address sub-schema
const addressSchema = new Schema({
  country: { type: String, required: true },
  dist: { type: String, required: true },
  state: { type: String, required: true },
  po: { type: String, required: true },
  loc: { type: String, default: '' },
  vtc: { type: String, default: '' },
  subdist: { type: String, default: '' },
  street: { type: String, required: true },
  house: { type: String, required: true },
  landmark: { type: String, required: true }
}, { _id: false });

// Response sub-schema
const responseSchema = new Schema({
  request_id: { type: String, required: true },
  aadhar: { type: String, required: true },
  name: { type: String, required: true },
  care: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: addressSchema, required: true },
  image: { type: String, required: true },  
  share_code: { type: String, required: true },
  zip_file: { type: String, required: true }  
});

// AadharVerification schema definition
const aadharVerificationSchema = new Schema({
  verification_id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  code: { type: Number, required: true },
  status: { type: String, required: true },
  message: { type: String, required: true },
  request_id: { type: String, required: true },
  response: { type: responseSchema, required: true },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Data',
    required: true
  },
  verified_at: { type: Date, default: Date.now }
}, { timestamps: true });  

// Create and export the AadharVerification model
const AadharVerification = mongoose.model('AadharVerification', aadharVerificationSchema);

module.exports = AadharVerification;
