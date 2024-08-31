const mongoose = require('mongoose');

const bookRideSchema = new mongoose.Schema({
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    seatsBooked: {
        type: Number,
        required: true,
        min: 1
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    bookingStatus: {
        type: String,
        enum: ['confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    bookingDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    rideUpdateDate: {
        type: Date
    },
    cancellationDate: {
        type: Date
    },
    pickupTime: {
        type: Date,
        required: true
    },
    pickupName: {
        type: String,
        required: true
    },
    pickupPoint: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    dropoffName: {
        type: String,
        required: true
    },
    dropoffPoint: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    preferences: {
        smoking: {
            type: Boolean,
            default: false
        },
        pets: {
            type: Boolean,
            default: false
        },
        music: {
            type: Boolean,
            default: false
        }
    },
    femaleOnly: {
        type: Boolean,
        default: false
    },
    markAsComplete: {
        type: Boolean,
        default: false
    },
    rideCompleteDateTime: {
        type: Date
    }
});

// Middleware to set rideCompleteDateTime when markAsComplete is set to true
bookRideSchema.pre('save', function(next) {
    if (this.markAsComplete && !this.rideCompleteDateTime) {
        this.rideCompleteDateTime = Date.now();
    }
    next();
});

const BookRide = mongoose.model('BookRide', bookRideSchema);
module.exports = BookRide;
