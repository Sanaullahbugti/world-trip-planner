import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout());
    navigate('/');
  };
console.log("isAuthenticated",isAuthenticated)
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          TripPlanner
        </Link>
        
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link 
                to="/trips" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                My Trips
              </Link>
              <Link 
                to="/planner" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                Plan a Trip
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="text-white hover:text-gray-300 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 