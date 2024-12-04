import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import SearchInput from './SearchInput';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black z-0" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <Compass className="w-12 h-12 text-purple-500" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Elite AI Tour Guide
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Experience personalized travel planning powered by advanced AI. Your perfect itinerary awaits.
        </p>
      </motion.div>

      <SearchInput />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-8 left-0 right-0 text-center text-gray-400"
      >
        <p>Trusted by thousands of travelers worldwide</p>
      </motion.div>
    </div>
  );
}