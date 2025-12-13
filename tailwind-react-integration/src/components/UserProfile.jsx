import React from 'react'
import userImage from '../assets/download.jpeg';

function UserProfile() {
  return (
    <div className="user-profilecontainer mx-auto bg-gray-100 sm:p-4 md:p-8 max-w-xs md:max-w-sm my-20 rounded-lg shadow-lg hover:shadow-xl">
      <img src={userImage} 
           alt="User" 
           className="rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36
           mx-auto 
           hover:scale-110 
           transition-transform 
           duration-300 
           ease-in-out" />

      <h1 className="sm:text-lg md:text-xl 
          font-bold 
          text-blue-800 
          my-4 
          hover:text-blue-500">John Doe</h1>
      <p className="text-gray-600 text-sm md:text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile