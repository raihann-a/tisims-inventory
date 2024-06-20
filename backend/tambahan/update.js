import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    nomer_pembuatan: '',
    merk_pembuatan: '',
    category: '',
    stok_sekarang: ''
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:3001/items/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Error updating item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Update Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomer_pembuatan">
            Nomer Pembuatan
          </label>
          <input
            type="text"
            name="nomer_pembuatan"
            value={item.nomer_pembuatan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="merk_pembuatan">
            Merk Pembuatan
          </label>
          <input
            type="text"
            name="merk_pembuatan"
            value={item.merk_pembuatan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stok_sekarang">
            Stok Sekarang
          </label>
          <input
            type="number"
            name="stok_sekarang"
            value={item.stok_sekarang}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Item
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
