const mongoose = require('mongoose');
const RecurrenceSchema = require('./RecurrenceSchema'); 

const RideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    sourceName: {
        type: String,
        required: true
    },
    sourcePoint: {
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true
        }
    },
    addStopName: {
        type: String
    },
    addStopPoints: {
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    destinationName: {
        type: String,
        required: true
    },
    destinationPoint: {
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true
        }
    },
    vehical: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle', 
        required: true
    },
    routes: {
        type: String,
        required: true
    },
    tripDistance: {
        type: String,
        required: true
    },
    tripDuration: {
        type: String,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    pickupDate: {
        type: String,
        required: true
    },
    noOfSeat: {
        type: String,
        required: true
    },
    pricePerSeat: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'ongoing', 'cancelled', 'completed'],
        default: 'pending'
    },
    recurrence: RecurrenceSchema  
});

const Ride = mongoose.model('OfferRide', RideSchema);

module.exports = Ride;
