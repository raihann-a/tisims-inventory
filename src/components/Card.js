//Komponen Kartu di dashboard
import React from 'react';

const Card = ({ title, data, icon }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg flex items-center space-x-4">
      <div className="p-3 bg-gray-200 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-semibold">{data}</p>
      </div>
    </div>
  );
};

export default Card;
