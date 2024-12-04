const Trip = require('../models/tripModel');

const createTrip = async (tripData) => new Trip(tripData).save();

const findTripsByUserId = async (userId) => {
    try {
      const trips = await Trip.find({ userId }).sort({ createdAt: -1 }); // Sorting by most recent trip
      return trips;
    } catch (error) {
      throw new Error('Error fetching trips from the database');
    }
  };
module.exports = { createTrip, findTripsByUserId };
