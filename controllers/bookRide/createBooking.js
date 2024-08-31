const BookRide = require('../../models/BookRide');

exports.createBooking = async (req, res) => {
    try {
        const { 
            ride, 
            user, 
            seatsBooked, 
            totalAmount, 
            travelDate, 
            pickupTime, 
            pickupName, 
            pickupPoint, 
            dropoffName, 
            dropoffPoint,
            paymentStatus, 
            bookingStatus,
            preferences, 
            femaleOnly,
            markAsComplete
        } = req.body;

        // Validate required fields
        if (!ride || !user || !seatsBooked || !totalAmount || !travelDate || !pickupTime || !pickupName || !pickupPoint || !dropoffName || !dropoffPoint) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        // Create new booking
        const newBooking = new BookRide({
            ride,
            user,
            seatsBooked,
            totalAmount,
            paymentStatus: paymentStatus || 'pending', 
            bookingStatus: bookingStatus || 'confirmed', 
            travelDate,
            pickupTime,
            pickupName,
            pickupPoint,
            dropoffName,
            dropoffPoint,
            preferences: preferences || {},
            femaleOnly: femaleOnly || false, 
            markAsComplete: markAsComplete || false 
        });

        await newBooking.save();
        res.status(201).json({ success: true, message: 'Ride booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error); 
        res.status(500).json({ success: false, message: 'Failed to create ride booking', error: error.message });
    }
};
