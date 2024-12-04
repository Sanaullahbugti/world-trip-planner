import axiosInstance from '../utils/axiosInstance'; // Import the custom axios instance

const API_URL = '/trips/all';

export const fetchTrips = async () => {
  const response = await axiosInstance.get(API_URL); // Use the axiosInstance for the API call
  return response.data.data; // Return the trips data
}; 