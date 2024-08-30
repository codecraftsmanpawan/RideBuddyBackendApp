const mongoose = require('mongoose');
const axios = require('axios');

const SelfieVerification = require('../../models/SelfieVerification');
const Profile = require('../../models/Profile');

// Define the controller function
const selfieVerification = async (req, res) => {
  // Extract doc_img, selfie, x-request-id, and profileId from the request body
  const { doc_img, selfie, xRequestId, profileId } = req.body;

  // Validate input
  if (!doc_img || !selfie || !xRequestId) {
    return res.status(400).json({
      message: 'doc_img (Base64), selfie (Base64), and x-request-id are required.'
    });
  }

  // Helper function to check if a string is a valid ObjectId
  const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

  try {
    // Ensure the doc_img and selfie are in Base64 format
    const isBase64 = (str) => {
      const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
      return base64Regex.test(str);
    };

    if (!isBase64(doc_img) || !isBase64(selfie)) {
      return res.status(400).json({
        message: 'doc_img and selfie must be valid Base64 encoded strings.'
      });
    }

    // Define the options for the API request
    const options = {
      method: 'POST',
      url: 'https://prod.apiclub.in/api/v1/face_match',
      headers: {
        accept: 'application/json',
        'x-request-id': xRequestId, // Use the x-request-id from request body
        Referer: 'docs.apiclub.in',
        'content-type': 'application/json',
        'x-api-key': 'apclb_wMttXrEyW3xA0dul9FsuAMu41f32119e'
      },
      data: { doc_img, selfie } // Pass Base64 encoded doc_img and selfie
    };

    // Make the API request
    const response = await axios.request(options);

    // Extract relevant data from the API response
    const { code, status, message, request_id, response: apiResponse } = response.data;

    // Create the selfieVerification document before checking or updating the profile
    const selfieVerification = new SelfieVerification({
      code,
      status,
      message,
      request_id,
      response: apiResponse,
      profile: profileId ? mongoose.Types.ObjectId(profileId) : undefined // If a profile exists, set the reference
    });

    await selfieVerification.save();

    // Check if profileId is provided and valid
    let profile;
    if (profileId) {
      if (!isValidObjectId(profileId)) {
        return res.status(400).json({
          message: 'Invalid profile ID format.'
        });
      }

      profile = await Profile.findById(profileId);
      
      // Handle case where profile is not found
      if (!profile) {
        return res.status(404).json({
          message: 'User not found.'
        });
      }

      // If a profile is found and it's already verified, handle accordingly
      if (profile.isVerified) {
        return res.status(400).json({
          message: 'Profile already verified.'
        });
      }

      // Update the profile with the selfieVerification ID
      profile.selfieVerification = selfieVerification._id;
      await profile.save();
    }

    // Send the response data to the client with a success message
    res.status(200).json({
      message: 'Selfie verification successful',
      data: response.data
    });
  } catch (error) {
    // Handle errors and send an error response to the client
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({
        message: 'Selfie verification request already exists.',
        error: 'Duplicate key error: request_id already exists'
      });
    } else if (error.name === 'CastError' && error.path === '_id') { // Invalid ObjectId
      res.status(400).json({
        message: 'Invalid profile ID format.',
        error: error.message
      });
    } else if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'An error occurred during selfie verification.',
        error: error.response.data
      });
    } else {
      res.status(500).json({
        message: 'An error occurred during selfie verification.',
        error: error.message
      });
    }
  }
};

// Define the controller function for deleting a SelfieVerification
const deleteSelfieVerification = async (req, res) => {
  // Extract selfieVerificationId and profileId from the request parameters
  const { selfieVerificationId, profileId } = req.params;

  // Validate selfieVerificationId
  if (!mongoose.Types.ObjectId.isValid(selfieVerificationId)) {
    return res.status(400).json({
      message: 'Invalid selfie verification ID format.'
    });
  }

  // Validate profileId
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    return res.status(400).json({
      message: 'Invalid profile ID format.'
    });
  }

  try {
    // Find and delete the SelfieVerification document
    const selfieVerification = await SelfieVerification.findByIdAndDelete(selfieVerificationId);

    if (!selfieVerification) {
      return res.status(404).json({
        message: 'Selfie verification document not found.'
      });
    }

    // Find and update the associated Profile document
    const profile = await Profile.findById(profileId);
    if (profile) {
      // Remove the selfieVerification reference from the profile
      if (profile.selfieVerification && profile.selfieVerification.toString() === selfieVerificationId) {
        profile.selfieVerification = undefined;
        await profile.save();
      }
    } else {
      return res.status(404).json({
        message: 'Profile not found.'
      });
    }

    // Send a success response
    res.status(200).json({
      message: 'Selfie verification document successfully deleted.'
    });
  } catch (error) {
    // Handle errors and send an appropriate response to the client
    console.error('Error deleting SelfieVerification document:', error);

    if (error.name === 'CastError' && error.path === '_id') { // Invalid ObjectId
      res.status(400).json({
        message: 'Invalid ID format.',
        error: error.message
      });
    } else {
      res.status(500).json({
        message: 'An error occurred while deleting the selfie verification document.',
        error: error.message
      });
    }
  }
};


module.exports = { selfieVerification, deleteSelfieVerification };
