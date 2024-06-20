import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Profile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    // Logic to handle logout here, like clearing user session data
    navigate('/'); // Redirect to login after logout
  };

  return (
    <div className="relative w-full max-w-xs p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between space-x-3 cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
        <img src="logo192.png" alt="Profile" className="w-10 h-10 rounded-full" />
        <span className="flex-grow font-semibold">Admin</span>
        <div className="flex-shrink-0">
          <button className="text-gray-500 hover:text-gray-700">
            {/* Icon or button to indicate dropdown */}
            {showMenu ? '▲' : '▼'}
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="mt-2 py-2 bg-white rounded-md shadow-xl">
          <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;