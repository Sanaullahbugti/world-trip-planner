import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Map from './Map';
import ChatBox from './ChatBox';

export default function TripPlanner() {
  const trips = useSelector((state) => state.trips.trips);
  const [selectedActivities, setSelectedActivities] = useState([]);

  useEffect(() => {
    if (trips.length > 0) {
      const allActivities = trips[0].trip.itinerary.flatMap(day => day.activities);
      console.log(allActivities)
      setSelectedActivities(allActivities);
    }
  }, [trips]);

  return (
    <div className="h-[calc(100vh-64px)] bg-black flex">
      {/* Map Section */}
      <div className="flex-1 relative justify-center ">
        <Map activities={selectedActivities} className="w-80 h-64" />
      </div>

      {/* Chat Section */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 p-4 bg-black border-l border-gray-800"
      >
        <ChatBox />
      </motion.div>
    </div>
  );
}