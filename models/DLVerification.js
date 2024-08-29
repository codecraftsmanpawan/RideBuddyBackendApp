const mongoose = require('mongoose');
const { Schema } = mongoose;

// DLVerification schema definition
const dlVerificationSchema = new Schema({
  code: { type: Number, required: true },
  status: { type: String, required: true },
  message: { type: String, required: true },
  request_id: { type: String, required: true, unique: true },
  response: {
    request_id: { type: String, required: true },
    license_number: { type: String, required: true },
    dob: { type: String, required: true },
    holder_name: { type: String, required: true },
    father_or_husband_name: { type: String, required: true },
    gender: { type: String, required: true },
    issue_date: { type: String, required: true }, 
    rto_code: { type: String, required: true },
    rto: { type: String, required: true },
    state: { type: String, required: true },
    valid_from: { type: String, required: true }, 
    valid_upto: { type: String, required: true }, 
    blood_group: { type: String, default: '' },
    vehicle_class: { type: String, required: true },
    image: { type: String, default: '' }
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  verified_at: { type: Date, default: Date.now }
}, { timestamps: true });

const DLVerification = mongoose.model('DLVerification', dlVerificationSchema);

module.exports = DLVerification;
