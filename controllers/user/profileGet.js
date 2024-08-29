const Profile = require('../../models/Profile'); 

// Controller to get all profile data by userId
const getProfileByUserId = async (req, res) => {
    try {
        const { userId } = req.params; 

        // Fetch the profile by userId and populate references
        const profile = await Profile.findOne({ userId })
            .select('-__v')  // Optionally exclude version key (__v)
            .populate('aadharVerification')  // Populate AadharVerification
            .populate('dlVerification')      // Populate DLVerification
            .populate('rcVerifications')     // Populate RcVerifications
            .populate('selfieVerification')  // Populate SelfieVerification
            .populate('wallet');             // Populate Wallet

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        return res.status(200).json(profile); // Send the complete profile data as JSON
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while retrieving profile' });
    }
};

module.exports = { getProfileByUserId };
