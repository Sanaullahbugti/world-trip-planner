import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrips } from '../store/slices/tripSlice'; // Import the getTrips action

export default function MyTrips() {
  const dispatch = useDispatch();
  const { trips, status } = useSelector((state) => state.trips); // Access trips from state

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTrips()); // Fetch trips when component mounts
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-black p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-8">My Trips</h1>
        
        <div className="grid gap-6">
          {trips.map((trip) => (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 border border-gray-700 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">{trip.prompt}</h2>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{trip.trip.overview.description}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{trip.trip.overview.total_cost}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}