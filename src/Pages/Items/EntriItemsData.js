import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EntriItemsData = () => {
  const [formData, setFormData] = useState({
    batch_number: '',
    manufacture_brand: '',
    category: '',
    type: '',
    current_quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gagal menambahkan item');
      }

      const result = await response.json();  // Pastikan respons diparsing sebagai JSON
      console.log("New item data:", result);
      alert(result.message);  // Menggunakan pesan dari respons JSON
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menambahkan item');
    }
    navigate('/items-data');
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Entri Items Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="batch_number" className="block text-sm font-medium text-gray-700">Part Number:</label>
          <input
            type="text"
            name="batch_number"
            id="batch_number"
            value={formData.batch_number}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="manufacture_brand" className="block text-sm font-medium text-gray-700">Manufacture Brand:</label>
          <input
            type="text"
            name="manufacture_brand"
            id="manufacture_brand"
            value={formData.manufacture_brand}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
          <input
            type="text"
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="current_quantity" className="block text-sm font-medium text-gray-700">Current Stock:</label>
          <input
            type="number"
            name="current_quantity"
            id="current_quantity"
            value={formData.current_quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none"
            required
          />
        </div>
        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EntriItemsData;
