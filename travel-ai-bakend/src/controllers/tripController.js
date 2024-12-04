const { createTrip, findTripsByUserId } = require('../repositories/tripRepository');
const { sendToGemini } = require('../services/geminiService');
const _Response = require('../utils/_Response');
const { ResponseCode } = require('../constants/ResponseCode');
const { updateUserTokens } = require('../repositories/userRepository');

const createTripEntry = async (req, res) => {
  const { prompt } = req.body;

  if (req.user.tokens <= 0) {
    return _Response.send(res, {
      status: ResponseCode.FORBIDDEN,
      message: 'Not enough tokens to perform this operation.',
    });
  }

  try {
    // Call Gemini API
    const geminiResponse = await sendToGemini(prompt);

    // Extract data
    const { overview, itinerary } = geminiResponse;
    const inputTokens = geminiResponse.inputTokens || 1000; 
    const outputTokens = geminiResponse.outputTokens || 2000;
    const totalTokens = inputTokens + outputTokens;

    // Save trip in database
    const tripEntry = await createTrip({
      userId: req.user._id,
      prompt,
      trip: { overview, itinerary },
      inputTokens,
      outputTokens,
    });

    // Deduct tokens from user
    await updateUserTokens(req.user._id, -totalTokens);

    return _Response.send(res, {
      status: ResponseCode.SUCCESS,
      message: 'Trip created successfully',
      data: tripEntry,
    });
  } catch (error) {
    console.error(error);
    return _Response.send(res, {
      status: ResponseCode.INTERNAL_ERROR,
      message: 'Failed to create trip',
      error: error.message,
    });
  }
};
const getTripsByUser = async (req, res) => {
    try {
      // Get the trips for the user from the repository
      const trips = await findTripsByUserId(req.user._id);
  
      // Return the trips in the response
      return _Response.send(res, {
        status: ResponseCode.SUCCESS,
        message: 'Trips fetched successfully',
        data: trips,
      });
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      return _Response.send(res, {
        status: ResponseCode.INTERNAL_ERROR,
        message: 'Failed to fetch trips',
        error: error.message,
      });
    }
  };

module.exports = { createTripEntry,getTripsByUser };
