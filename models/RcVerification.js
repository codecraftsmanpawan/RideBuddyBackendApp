const mongoose = require('mongoose');
const ProfileSchema = require('./Profile'); 

const rcVerificationSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  status: { type: String, required: true },
  message: { type: String, required: true },
  request_id: { type: String, required: true },
  response: {
    license_plate: { type: String, required: true, unique: true }, 
    owner_name: { type: String, required: true },
    is_financed: { type: String, default: '' },
    financer: { type: String, default: '' },
    insurance_company: { type: String, required: true },
    insurance_policy: { type: String, default: '' },
    insurance_expiry: { type: Date },
    class: { type: String, required: true },
    registration_date: { type: Date, required: true },
    vehicle_age: { type: Number },
    pucc_upto: { type: Date },
    pucc_number: { type: String, default: '' },
    chassis_number: { type: String, required: true },
    engine_number: { type: String, required: true },
    fuel_type: { type: String, required: true },
    brand_name: { type: String, required: true },
    brand_model: { type: String, required: true },
    cubic_capacity: { type: String, required: true },
    gross_weight: { type: String, required: true },
    cylinders: { type: String, required: true },
    color: { type: String, required: true },
    norms: { type: String, default: '' },
    noc_details: { type: String, default: '' },
    seating_capacity: { type: String, required: true },
    owner_count: { type: Number, required: true },
    tax_upto: { type: Date },
    tax_paid_upto: { type: Date },
    permit_number: { type: String, default: '' },
    permit_issue_date: { type: Date },
    permit_valid_from: { type: Date },
    permit_valid_upto: { type: Date },
    permit_type: { type: String, default: '' },
    national_permit_number: { type: String, default: '' },
    national_permit_upto: { type: Date },
    national_permit_issued_by: { type: String, default: '' },
    rc_status: { type: String, required: true },
    vehicle_color: { type: String, default: '' }, // New 
    vehicle_fuel_type: { type: String, default: '' }, // New 
    vehicle_image: { type: String, default: '' } // New 
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  verified_at: { type: Date, default: Date.now }
}, { timestamps: true });

const RcVerification = mongoose.model('RcVerification', rcVerificationSchema);

module.exports = RcVerification;
