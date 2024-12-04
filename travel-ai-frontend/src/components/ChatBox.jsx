import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import GoogleGeminiIcon from '../assets/google-gemini-icon.svg';
import { addTrip } from '../store/slices/tripSlice';
import { useDispatch } from 'react-redux';

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = message.trim();
    if (userMessage) {
      setResponses((prev) => [...prev, { type: 'user', content: userMessage }]);
      setMessage('');

      setResponses((prev) => [...prev, { type: 'bot', content: '...' }]);
      setIsThinking(true);

      try {
        const response = await axiosInstance.post(`/trips/create`, {
          prompt: userMessage,
        });

        if (response.data.status === 'success') {
          const newTrip = response.data.data; // Extract the new trip data
          dispatch(addTrip(newTrip)); // Add the new trip to Redux state
        
          const { description, total_cost } = response.data.data.trip.overview;
          setResponses((prev) => {
            const updatedResponses = [...prev];
            updatedResponses[updatedResponses.length - 1] = { type: 'bot', content: { description, total_cost } };
            return updatedResponses;
          });
          setIsThinking(false);
        }
      } catch (error) {
        console.error('Error creating trip:', error);
        setIsThinking(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50 border border-gray-700 rounded-xl">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="text-gray-400">
          Ask me anything about your trip!
        </div>
      
          <div className="space-y-4">
            {responses.map((resp, index) => (
              <div key={index} className={`flex ${resp.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-2 max-w-[80%] ${resp.type === 'user' ? 'bg-blue-700' : 'bg-gray-800'}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {resp.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    <span className="font-semibold">{resp.type === 'user' ? 'You' : 'Planner'}</span>
                  </div>
                  <p>{resp.type === 'user' ? resp.content : resp.content.description}</p>
                  {resp.type === 'bot' && isThinking && index === responses.length - 1 && (
                    <img src={GoogleGeminiIcon} alt="Thinking..." className="animate-thinking scale-animation" />
                  )}
                  {resp.type === 'bot' && !isThinking && <p>Total Cost: {resp.content.total_cost}</p>}
                </div>
              </div>
            ))}
          </div>
        
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full pl-4 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-500 hover:text-purple-400"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}