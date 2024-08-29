const Vehicle = require('../../models/Vehicle');
const Ride = require('../../models/RideOffer');
const Profile = require('../../models/Profile');

exports.createRide = async (req, res) => {
    try {
        const driver = req.user.id;
        const { 
            sourceName, sourcePoint, addStopName, addStopPoints, destinationName, 
            destinationPoint, routes, tripDistance, tripDuration, pickupTime, pickupDate, 
            noOfSeat, pricePerSeat, recurrence 
        } = req.body;

        // Validate required fields
        if (!sourceName || !sourcePoint || !destinationName || !destinationPoint || 
            !routes || !tripDistance || !tripDuration || !pickupTime || !pickupDate || 
            !noOfSeat || !pricePerSeat) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        // Validate recurrence if provided
        let recurrenceData = null;
        if (recurrence) {
            const { daysOfWeek, profileId } = recurrence;
            
            if (!daysOfWeek || !profileId) {
                return res.status(400).json({ message: "Recurrence requires both daysOfWeek and profileId" });
            }

            // Validate profileId
            const profileExists = await Profile.findById(profileId);
            if (!profileExists) {
                return res.status(400).json({ message: "Invalid profileId in recurrence" });
            }

            recurrenceData = {
                daysOfWeek,
                profileId
            };
        }

        // Check if vehicle exists for the driver
        const vehicles = await Vehicle.find({ driver });
        if (vehicles.length === 0) {
            return res.status(400).json({ message: 'No vehicle found for the user' });
        }
        const vehicle = vehicles[0];
        const vehical = vehicle.id;

        // Create new ride
        const newRide = new Ride({
            driver,
            sourceName,
            sourcePoint,
            addStopName,
            addStopPoints,
            destinationName,
            destinationPoint,
            vehical,
            routes,
            tripDistance,
            tripDuration,
            pickupTime,
            pickupDate,
            noOfSeat,
            pricePerSeat,
            recurrence: recurrenceData  // Add recurrence data if provided
        });

        await newRide.save();
        res.status(201).json({ success: true, message: 'Ride created successfully', ride: newRide });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create ride', error: error.message });
    }
};
