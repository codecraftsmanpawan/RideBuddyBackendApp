const moment = require('moment');
const Ride = require('../models/RideOffer'); 

async function createRecurringRides() {
    try {
        // Find rides with recurrence
        const rides = await Ride.find({ recurrence: { $exists: true } });

        for (const ride of rides) {
            const today = moment();
            const daysOfWeek = ride.recurrence.daysOfWeek;
            const profileId = ride.recurrence.profileId;

            // Check if today is two days before any of the recurrence days
            daysOfWeek.forEach(async day => {
                const targetDate = moment().day(day);
                if (targetDate.diff(today, 'days') === 2) {
                    // Create a new ride based on the original ride
                    const newRide = new Ride({
                        ...ride.toObject(),
                        _id: undefined, 
                        pickupDate: targetDate.format('YYYY-MM-DD'),
                        status: 'scheduled',
                        recurrence: {
                            daysOfWeek: ride.recurrence.daysOfWeek,
                            profileId: ride.recurrence.profileId
                        }
                    });

                    await newRide.save();
                }
            });
        }
    } catch (error) {
        console.error('Error creating recurring rides:', error);
    }
}

module.exports = createRecurringRides;
