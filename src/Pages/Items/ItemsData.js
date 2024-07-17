import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaTrashAlt, FaPlus, FaBars, FaEdit} from 'react-icons/fa';

// Fungsi untuk mengambil data dari backend
const fetchItemsData = async () => {
  try {
    const response = await fetch('http://localhost:3001/items'); // Ganti dengan URL backend Anda
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Gagal mengambil data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteItem = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Gagal menghapus data');
    }
    return response;
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

const ItemsData = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [itemsToShow, setItemsToShow] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItemsData().then(data => setItems(data || []));
  }, []);

  const handleAddEntry = () => {
    navigate('/entri-items-data');
  };
  const handleNavigateToDescription = (itemId) => {
    navigate(`/item-description/${itemId}`); 
  };
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredItems = items.filter(item => 
    item.batch_number.toLowerCase().includes(filter.toLowerCase()) || 
    item.manufacture_brand.toLowerCase().includes(filter.toLowerCase())
  ).slice(0, itemsToShow);
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    
    if (confirmed) {
      await deleteItem(id);
      fetchItemsData().then(data => setItems(data || []));
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Items Data</h1>
        <button onClick={handleAddEntry} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaPlus className="mr-2" />Entri Data
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="itemsToShow">Show</label>
          <select 
            value={itemsToShow} 
            onChange={(e) => setItemsToShow(e.target.value)} 
            className="mx-2 p-1 border rounded">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          items
        </div>
        <input 
          type="text" 
          placeholder="Search..."
          value={filter} 
          onChange={handleSearchChange} 
          className="px-3 py-2 border rounded shadow-sm focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">No</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Part Number</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Manufacture</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Current Stock</th>
              <th className="text-left py-3 px-16 uppercase font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="text-left py-3 px-4">{index + 1}</td>
                <td className="text-left py-3 px-4">{item.batch_number}</td>
                <td className="text-left py-3 px-4">{item.type}</td>
                <td className="text-left py-3 px-4">{item.category}</td>
                <td className="text-left py-3 px-4">{item.manufacture_brand}</td>
                <td className="text-left py-3 px-4">{item.current_quantity}</td>
                <td className="text-left py-3 px-4">
                  <button
                    onClick={() => handleNavigateToDescription(item.id)}
                    className="text-black-500 hover:text-red-500 px-4 py-2 rounded"
                    title="View Details"
                  >
                    <FaBars />
                  </button>
                  <button className="text-black-500 hover:text-red-500 px-4 py-2 rounded transition duration-150 ease-in-out" title="Edit Item">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)} 
                    className="text-red-500 hover:text-red-800 mr-2" 
                    title="Delete Item">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsData;
